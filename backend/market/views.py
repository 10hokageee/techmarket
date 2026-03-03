import re

from django.db.models import Q
from django.db.models.functions import Coalesce
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
        params = self.request.query_params

        if set(params).intersection(  # same as &
            {
                "search",
                "lte_price",
                "gte_price",
                "colors",
                "categories",
                "series",
            }
        ):
            if search_param := params.get("search"):
                queryset = queryset.filter(name__icontains=search_param.strip())

            lte_p = params.get("lte_price")
            gte_p = params.get("gte_price")
            if lte_p or gte_p:
                queryset = queryset.annotate(
                    current_price=Coalesce("sale_price", "original_price")
                )
                if lte_p and lte_p.isdigit():  # price less than or equal to query param
                    queryset = queryset.filter(current_price__lte=lte_p)
                if (
                    gte_p and gte_p.isdigit()
                ):  # price greater than or equal to query param
                    queryset = queryset.filter(current_price__gte=gte_p)

            if colors := params.get("colors"):
                queryset = queryset.filter(
                    color__in={
                        f"#{val_item.lstrip('#'):06}"
                        for color in colors.split(",")
                        if (val_item := color.strip())
                    }
                )

            for param_name, field_lookup in (
                ("categories", "category__iregex"),
                ("series", "series__name__iregex"),
            ):
                if values := params.get(param_name):
                    pattern = "|".join(
                        re.escape(item)
                        for val in values.split(",")
                        if (item := val.strip())
                    )
                    if pattern:
                        queryset = queryset.filter(**{field_lookup: pattern})
        else:
            default_series = {
                "Custom PCs",
                "MSI GS Series",
                "MSI GT Series",
                "MSI GL Series",
                "MSI GE Series",
                "MSI Infinute Series",
                "MSI Triden",
                "MSI Nightblade",
            }
            latest_ids = Product.objects.values_list("id", flat=True)[:10]
            queryset = queryset.filter(
                Q(series__name__in=default_series) | Q(id__in=latest_ids)
            ).order_by("-created_at")
        return queryset.distinct()


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
