from rest_framework import serializers

from market.models import Product, Signboard


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

        return data


class SignboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signboard
        fields = ("id", "image")
