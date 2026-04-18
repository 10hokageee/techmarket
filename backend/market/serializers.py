from django.db.models.functions import Replace

from payments.tasks import create_stripe_session
from django.db import transaction, IntegrityError
from django.db.models import F, Value
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from market.models import (
    Product,
    Signboard,
    Order,
    OrderItem,
    _color_validator,
    Series,
    _setdefault_float_value,
    _setdefault_int_value,
)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "series",
            "stock_quantity",
            "original_price",
            "sale_price",
            "characteristics",
            "colors",
            "description",
            "reviews",
            "rating_avg",
        )
        read_only_fields = ("id", "reviews", "rating_avg")

    def validate(self, attrs):
        if sale_pr := attrs.get("sale_price"):
            if not (orig_pr := attrs.get("original_price")) or sale_pr >= orig_pr:
                raise ValidationError(
                    {
                        "sale_price": "When updating the sale_price field, "
                        "you must pass the original_price field and "
                        "it must be greater than sale_price."
                    }
                )
        return attrs

    def validate_name(self, data):
        if "__" in data:
            raise ValidationError('Names containing "__" are prohibited.')
        return data

    def validate_colors(self, data):
        return _color_validator(data, ValidationError)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["category"] = instance.get_category_display()
        data["series"] = instance.series.name
        data["rating_avg"] = str(instance.rating_avg)
        data["status"] = bool(instance.stock_quantity)
        data["name"] = instance.get_name

        if not hasattr(instance, "ext_images"):
            data["images"] = instance.get_list_images

        if instance.current_color:
            data["current_color"] = instance.current_color
        return data

    def create(self, validated_data):
        name = validated_data.pop("name")
        products_data = (
            Product(
                current_color=color,
                name=f"{name}__{color}",
                rating_avg=round(_setdefault_float_value(1.0, 5.0), 2),
                reviews=_setdefault_int_value(3, 52, 10),
                **validated_data,
            )
            for color in validated_data.get("colors")
        )
        products = Product.objects.bulk_create(products_data)

        # for to_representation ----------------------------------|
        product = products[0]
        product.current_color = None
        product.name = name
        product.ext_images = True
        # --------------------------------------------------------|
        return product

    def update(self, instance, validated_data):
        update_fields = {
            key: validated_data[key]
            for key in validated_data
            if getattr(instance, key) != validated_data[key]
        }
        if name := update_fields.pop("name", None):
            base_name = instance.name.rsplit("__", 1)[0]
            names = (f"{base_name}__{color}" for color in instance.colors)
            Product.objects.filter(name__in=names).update(
                name=Replace("name", Value(base_name), Value(name))
            )
            instance.name = f"{name}__{instance.current_color}"

        for key, value in update_fields.items():
            setattr(instance, key, value)
        instance.save(update_fields=update_fields.keys())

        # TODO implement update with category, series, current_color or colors

        return instance


class SignboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signboard
        fields = ("id", "image")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["image"] = instance.get_image_url
        return data


class CachedPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        cache = getattr(self.root, "_products_cache", None)
        if cache is not None:
            try:
                pk = (
                    self.pk_field.to_internal_value(data)
                    if self.pk_field
                    else int(data)
                )
                product = cache.get(pk)
                if product is None:
                    self.fail("does_not_exist", pk_value=data)
                return product
            except (ValueError, TypeError):
                self.fail("incorrect_type", data_type=type(data).__name__)

        return super().to_internal_value(data)


class OrderItemSerializer(serializers.ModelSerializer):
    product = CachedPrimaryKeyRelatedField(queryset=Product.objects.all())
    price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )  # added for swagger-ui documentation

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product",
            "quantity",
            "unit_price",
            "price",
        )
        read_only_fields = ("id", "unit_price", "price")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["product"] = instance.product.get_name
        data["price"] = str(instance.price)
        return data


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, allow_empty=False)

    class Meta:
        model = Order
        fields = ("id", "items", "total_amount")
        read_only_fields = ("id", "total_amount")

    def to_internal_value(self, data):
        items_raw = data.get("items") or []
        product_ids = [
            item["product"]
            for item in items_raw
            if isinstance(item, dict) and item.get("product")
        ]
        self._products_cache = {
            p.id: p for p in Product.objects.filter(id__in=product_ids)
        }

        return super().to_internal_value(data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        payment = instance.payment
        data["payment_status"] = payment.status
        match payment.status:
            case "UNPAID":
                data["payment_url"] = payment.session_url
            case "PAID":
                data["receipt"] = payment.receipt
        return data

    def validate_items(self, value):
        PRODUCTS_QUANTITY_LIMIT = 100

        unique_ids = set()
        for item in value:
            product = item["product"]
            quantity = item["quantity"]

            if product.id in unique_ids:
                raise ValidationError(
                    {"Duplicate product": f"Product id {product.id} duplicated."}
                )
            if product.stock_quantity < quantity:
                raise ValidationError(
                    {"Stock error": f"Not enough stock for {product.name}."}
                )

            unique_ids.add(product.id)

        # Stripe API products limit
        if len(unique_ids) > PRODUCTS_QUANTITY_LIMIT:
            raise ValidationError(
                {
                    "Counting error": f"There should be less than {PRODUCT_QUANTITY_LIMIT} products"
                }
            )

        return value

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop("items")

        _money_to_pay = sum(
            item["product"].actual_price * item["quantity"] for item in items_data
        )
        order = Order.objects.create(
            user=validated_data["user"], total_amount=_money_to_pay
        )
        order_items = []
        products_to_update = []
        for item in items_data:
            product = item["product"]
            quantity = item["quantity"]

            product.stock_quantity = F("stock_quantity") - quantity
            products_to_update.append(product)

            order_items.append(
                OrderItem(
                    order=order,
                    product=product,
                    quantity=quantity,
                    unit_price=product.actual_price,
                )
            )
        try:
            Product.objects.bulk_update(products_to_update, ("stock_quantity",))
        except IntegrityError:
            raise ValidationError(
                {
                    "error": "One of the items in your cart was out of stock during checkout."
                }
            )

        created_items = OrderItem.objects.bulk_create(order_items)
        order._prefetched_objects_cache = {"items": created_items}

        # It can be done asynchronously on better hardware.
        create_stripe_session(order=order)

        return order

    def update(self, instance, validated_data): ...


class SeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ("id", "name")
