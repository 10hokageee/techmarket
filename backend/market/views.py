from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from market.models import Product, Signboard, Order, Review
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, SignboardSerializer, OrderSerializer


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


class OrderViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Order.objects
    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.queryset.prefetch_related("items__product").filter(
            user=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CorsViewSet(viewsets.GenericViewSet):
    queryset = Review.objects
    lookup_field = "param"

    def list(self, request, *args, **kwargs):
        return Response({"data": f"{request.META.get("HTTP_ORIGIN")}"})

    def retrieve(self, request, *args, **kwargs):
        return Response({"data": f"{request.META.get(kwargs["param"])}"})
