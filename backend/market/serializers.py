from django.db import transaction
from django.db.models import F
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from market.models import Product, Signboard, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "series",
            "image",
            "stock_quantity",
            "original_price",
            "sale_price",
            "characteristics",
            "color",
            "description",
            "status",
            "reviews",
            "rating_avg",
        )
        read_only_fields = ("id", "reviews", "rating_avg")

    def validate(self, attrs):
        if attrs["sale_price"] >= attrs["original_price"]:
            raise ValidationError(
                {"sale_price": "The discount must be less than the original price."}
            )
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["category"] = instance.get_category_display()
        data["series"] = instance.series.name
        data["rating_avg"] = str(instance.rating_avg)

        return data


class SignboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signboard
        fields = ("id", "image")


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "product", "quantity")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["product"] = instance.product.name
        return data


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, allow_empty=False)

    class Meta:
        model = Order
        fields = ("id", "items")

    def validate_items(self, value):
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
        OrderItem.objects.bulk_create(order_items)

        return order

    def update(self, instance, validated_data): ...
