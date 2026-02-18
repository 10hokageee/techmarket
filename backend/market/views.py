from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser
from market.models import Product, Signboard
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, SignboardSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        _len = self.request.query_params.get("new_products")
        if _len and _len.isdigit() and (_len := int(_len)) <= 24:
            return self.queryset[:_len]
        return self.queryset


class SignboardViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Signboard.objects.all()
    serializer_class = SignboardSerializer
    permission_classes = (IsAdminUser,)
