from rest_framework import serializers

from market.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
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
        ]

class ProductListSerializer(ProductSerializer):
    series = serializers.SlugRelatedField(slug_field="name", read_only=True)
    # reviews_count = serializers.IntegerField(read_only=True)
    # rating_avg = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    category = serializers.CharField(read_only=True, source="get_category_display")
    status = serializers.CharField(read_only=True, source="get_status_display")

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ["reviews", "rating_avg"]
