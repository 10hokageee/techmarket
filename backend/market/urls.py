from rest_framework.routers import DefaultRouter
from market.views import ProductViewSet, OrderViewSet, SignboardViewSet

router = DefaultRouter()
router.register("products", ProductViewSet)
router.register("signboards", SignboardViewSet)
router.register("orders", OrderViewSet)

urlpatterns = router.urls

app_name = "market"
