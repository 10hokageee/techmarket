import re

from django.db.models import Q, QuerySet
from django.db.models.functions import Coalesce
from rest_framework import viewsets, mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from market.models import Product, Signboard, Order, Series
from market.serializers import (
    ProductSerializer,
    SignboardSerializer,
    OrderSerializer,
    SeriesSerializer,
)
from market.pagination import SimplifiedCustomPagination

NEW_PRODUCTS = 10


class ProductViewSet(viewsets.ModelViewSet):
    pagination_class = SimplifiedCustomPagination
    serializer_class = ProductSerializer
    pagination_params = {
        "search",
        "status",
        "price_lte",
        "price_gte",
        "colors",
        "categories",
        "series",
    }

    def get_queryset(self):
        queryset = Product.objects.select_related("series")
        params = self.request.query_params

        self.pagination_flag = (
            set(params) & self.pagination_params and self.query_params_validator()
        )

        if self.pagination_flag:
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
                "MSI Infinite Series",
                "MSI Triden",
                "MSI Nightblade",
            }
            latest_ids = Product.objects.values_list("id", flat=True)[:NEW_PRODUCTS]
            queryset = queryset.filter(
                Q(series__name__in=default_series) | Q(id__in=latest_ids)
            )
        return queryset.distinct()

    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        return get_object_or_404(
            Product.objects, **{self.lookup_field: self.kwargs[lookup_url_kwarg]}
        )

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset) if self.pagination_flag else None

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        if not self.pagination_flag:
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
        defaults = {
            "FALSE": {"stock_quantity__exact": 0},
            "TRUE": {"stock_quantity__gt": 0},
        }
        return (
            queryset.filter(**_lookup)
            if (_lookup := defaults.get(param.upper()))
            else queryset
        )

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
            colors__overlap=(color.strip().upper() for color in colors.split(","))
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


class OrderViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Order.objects
    serializer_class = OrderSerializer
    pagination_class = SimplifiedCustomPagination
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return (
            self.queryset.select_related("payment")
            .prefetch_related("items__product")
            .filter(user=self.request.user)
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SeriesViewSet(viewsets.ModelViewSet):
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer
    pagination_class = SimplifiedCustomPagination


@api_view(["GET"])
@permission_classes(permission_classes=())
def check_cors(request):
    return Response({"data": request.META.get("HTTP_ORIGIN")})
