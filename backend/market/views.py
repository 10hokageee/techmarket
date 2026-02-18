from rest_framework import viewsets

# from django.db.models import Count, Avg

from market.models import Product
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, ProductListSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        # return self.queryset.annotate(
        #     reviews_count=Count("reviews"),
        #     rating_avg=Avg("reviews__grade"),
        # )

        return self.queryset.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ProductListSerializer
        return ProductSerializer
