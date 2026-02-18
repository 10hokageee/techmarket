from rest_framework import viewsets
from market.models import Product
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrReadOnly,)
