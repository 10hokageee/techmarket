from django.db.models import Q
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from market.models import Product, Signboard, Order
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, SignboardSerializer, OrderSerializer
from market.pagination import ProductHomePagePagination


class ProductViewSet(viewsets.ModelViewSet):
    pagination_class = ProductHomePagePagination
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        queryset = Product.objects.select_related("series")
        if search_param := self.request.query_params.get("search"):
            queryset = queryset.filter(name__icontains=search_param)
        else:
            default_series = {
                "Custom PCs",
                "MSI GS Series",
                "MSI GT Series",
                "MSI GL Series",
                "MSI GE Series",
                "MSI Infinute Series",
                "MSI Triden",
                "MSI Nightblade"
            }
            latest_ids = Product.objects.values_list("id", flat=True)[:15]
            queryset = queryset.filter(
                Q(series__name__in=default_series) | Q(id__in=latest_ids)
            ).distinct().order_by("-created_at")
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


@api_view(["GET"])
@permission_classes(permission_classes=())
def check_cors(request):
    return Response({"data": request.META.get("HTTP_ORIGIN")})
