import re

from django.db.models import Q, QuerySet
from django.db.models.functions import Coalesce
from django.http import QueryDict
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from market.models import Product, Signboard, Order
from market.permissions import IsAdminOrReadOnly
from market.serializers import ProductSerializer, SignboardSerializer, OrderSerializer
from market.pagination import ProductHomePagePagination

NEW_PRODUCTS = 10


class ProductViewSet(viewsets.ModelViewSet):
    pagination_class = ProductHomePagePagination
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrReadOnly,)

    def get_queryset(self):
        queryset = Product.objects.select_related("series")
        params = self.request.query_params
        pagination_params = {
            "search",
            "status",
            "price_lte",
            "price_gte",
            "colors",
            "categories",
            "series",
        }
        self.request.pagination_flag = (
            set(params) & pagination_params and self.query_params_validator()
        )

        if self.request.pagination_flag:
            if search_param := params.get("search"):
                queryset = self._exec_search(param=search_param, queryset=queryset)

            if status := params.get("status"):
                queryset = self._filter_by_status(param=status, queryset=queryset)

            lte_p = params.get("price_lte")
            gte_p = params.get("price_gte")
            order_by = params.get("order_by")
            if lte_p or gte_p or (order_by and order_by.lstrip("-") == "current_price"):
                queryset = queryset.annotate(
                    current_price=Coalesce("sale_price", "original_price")
                )
                queryset = self._filter_by_price(
                    lte_price=lte_p, gte_price=gte_p, queryset=queryset
                )
            if colors := params.get("colors"):
                queryset = self._filter_by_color(colors=colors, queryset=queryset)

            queryset = self._iregex_filter(queryset=queryset)

            # default order by -created_at
            queryset = self._order_by_param(param=order_by, queryset=queryset)
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
            latest_ids = Product.objects.values_list("id", flat=True)[:NEW_PRODUCTS]
            queryset = queryset.filter(
                Q(series__name__in=default_series) | Q(id__in=latest_ids)
            )
        return queryset.distinct()

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        if not isinstance(response.data, dict):
            for index, elem in enumerate(response.data):
                elem["is_new"] = index < NEW_PRODUCTS
        return response

    def query_params_validator(self):
        params = self.request.query_params
        for param in params.values():
            if param == "":
                return False

        if (st := params.get("status")) and st.upper() not in ("TRUE", "FALSE"):
            return False

        def check_problem(value: str) -> bool:
            try:
                float(value)
            except ValueError:
                return True

        lte_p = params.get("price_lte")
        gte_p = params.get("price_gte")
        if (lte_p and check_problem(value=lte_p)) or (
            gte_p and check_problem(value=gte_p)
        ):
            return False
        return True

    def _iregex_filter(self, queryset: QuerySet[Product]) -> QuerySet[Product]:
        params = self.request.query_params
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
        return queryset

    @staticmethod
    def _filter_by_status(param: str, queryset: QuerySet[Product]) -> QuerySet[Product]:
        return queryset.filter(status=param)

    @staticmethod
    def _exec_search(param: str, queryset: QuerySet[Product]) -> QuerySet[Product]:
        return queryset.filter(name__icontains=param.strip())

    @staticmethod
    def _filter_by_price(
        lte_price: str, gte_price: str, queryset: QuerySet[Product]
    ) -> QuerySet[Product]:
        if lte_price:  # price less than or equal to query param
            queryset = queryset.filter(current_price__lte=lte_price)

        if gte_price:  # price greater than or equal to query param
            queryset = queryset.filter(current_price__gte=gte_price)
        return queryset

    @staticmethod
    def _filter_by_color(colors: str, queryset: QuerySet[Product]) -> QuerySet[Product]:
        return queryset.filter(
            color__in={
                f"#{val_item.lstrip('#'):06}"
                for color in colors.split(",")
                if (val_item := color.strip())
            }
        )

    @staticmethod
    def _order_by_param(param: str, queryset: QuerySet[Product]) -> QuerySet[Product]:
        return (
            queryset.order_by(param)
            if param and param.lstrip("-") in ("current_price", "name")
            else queryset
        )


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
