from django.urls import path
from rest_framework.routers import DefaultRouter
from market.views import (
    ProductViewSet,
    OrderViewSet,
    SignboardViewSet,
    check_cors,
    SeriesViewSet,
)

router = DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register("signboards", SignboardViewSet)
router.register("orders", OrderViewSet)
router.register("series", SeriesViewSet)

urlpatterns = [path("check_cors/", check_cors)] + router.urls

app_name = "market"
