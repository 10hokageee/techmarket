from rest_framework import viewsets, mixins
from market.models import Product, Signboard
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, SignboardSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        queryset = self.queryset.select_related("series")
        _len = self.request.query_params.get("new_products")
        if _len and _len.isdigit() and (_len := int(_len)) <= 24:
            return queryset[:_len]
        return queryset


class SignboardViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Signboard.objects.all()
    serializer_class = SignboardSerializer
    permission_classes = (IsAdminOrReadOnly,)
