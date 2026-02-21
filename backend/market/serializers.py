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

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["category"] = instance.get_category_display()
        data["status"] = instance.get_status_display()
        data["series"] = instance.series.name
        data["rating_avg"] = str(instance.rating_avg)

        if data["sale_price"] == data["original_price"]:
            data["sale_price"] = None

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

    def create(self, validated_data):
        _money_to_pay = sum(
            item["product"].sale_price * item["quantity"]
            for item in validated_data["items"]
        )

        order = Order.objects.create(
            user=validated_data["user"], total_amount=_money_to_pay
        )

        OrderItem.objects.bulk_create(
            [
                OrderItem(
                    order=order,
                    product=item["product"],
                    quantity=item["quantity"],
                    unit_price=item["product"].sale_price,
                )
                for item in validated_data["items"]
            ]
        )
        return order

    def update(self, instance, validated_data):
        ...
