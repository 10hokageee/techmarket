import re

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from django.db.models import Q, QuerySet, Value, F
from django.db.models.functions import Coalesce, Left, StrIndex, Concat
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from market import color_variables
from market.models import (
    Product,
    Signboard,
    Order,
    Series,
    ProductImage,
    CategoryChoices,
)
from market.serializers import (
    ProductSerializer,
    SignboardSerializer,
    OrderSerializer,
    SeriesSerializer,
)
from market.pagination import SimplifiedCustomPagination
from market.color_variables import colors as color_dict

NEW_PRODUCTS = 8


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
        queryset = Product.objects.select_related("series").prefetch_related("images")
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

            if categories := params.get("categories"):
                queryset = self._filter_by_categories(
                    categories=categories, queryset=queryset
                )
            if series := params.get("series"):
                queryset = self._series_iregex_filter(series=series, queryset=queryset)

            # default order by -created_at
            queryset = self._order_by_param(param=order_by, queryset=queryset)
        else:
            base_q_request = Q()
            for choice in CategoryChoices.values:
                base_q_request = base_q_request.__or__(
                    Q(
                        id__in=Product.objects.filter(category=choice)
                        .order_by("?")
                        .values_list("id", flat=True)[:NEW_PRODUCTS]
                    )
                )
            queryset = queryset.filter(base_q_request)
        return queryset

    def get_object(self):
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        obj_ = Product.objects.select_related("series").prefetch_related("images")
        local_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}

        if color := self.request.query_params.get("color"):
            base_name_subquery = (
                Product.objects.filter(**local_kwargs)
                .annotate(base_name=Left("name", StrIndex("name", Value("__")) - 1))
                .values("base_name")[:1]
            )
            return get_object_or_404(
                obj_, name=Concat(base_name_subquery, Value(f"__{color.upper()}"))
            )
        return get_object_or_404(obj_, **local_kwargs)

    def paginate_queryset(self, queryset):
        return super().paginate_queryset(queryset) if self.pagination_flag else None

    @action(detail=True, methods=["POST"])
    def upload_image(self, request, **_):
        MAX_SIZE_IMAGE = settings.MAX_SIZE_IMAGE
        product = self.get_object()
        images = request.FILES.getlist("images")
        if images:
            for image in images:
                if image.size > MAX_SIZE_IMAGE:
                    raise ValidationError(
                        {
                            "detail": "Icon must be less than 10 megabytes.",
                        }
                    )
                ProductImage.objects.create(product=product, image=image)
            return Response(
                {"Upload": "The upload was completed successfully."},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"Upload": "No images found."}, status=status.HTTP_400_BAD_REQUEST
        )

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        if not self.pagination_flag:
            for index, elem in enumerate(response.data):
                elem["is_new"] = index < NEW_PRODUCTS
        return response

    def perform_destroy(self, instance):
        base_name = instance.name.rsplit("__", 1)[0]
        names = (f"{base_name}__{color}" for color in instance.colors)
        Product.objects.filter(name__in=names).delete()

    def query_params_validator(self):
        params = self.request.query_params
        if (st := params.get("status")) and st.upper() not in ("TRUE", "FALSE"):
            return False

        def check_problem(value: str) -> bool:
            try:
                if value:
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

    def _filter_by_categories(
        self, categories: str, queryset: QuerySet[Product]
    ) -> QuerySet[Product]:
        categories_split = categories.upper().split(",")
        return queryset.filter(category__in=categories_split)

    def _series_iregex_filter(
        self, series: str, queryset: QuerySet[Product]
    ) -> QuerySet[Product]:
        pattern = "|".join(
            re.escape(item) for val in series.split(",") if (item := val.strip())
        )
        return queryset.filter(series__name__iregex=pattern)

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
        color_variables = set()
        for color in colors.split(","):
            color = color.strip().upper()
            variables = color_dict.get(color)
            if variables:
                color_variables = color_variables.union(variables)
        return queryset.filter(current_color__in=color_variables)

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
