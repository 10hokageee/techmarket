from rest_framework.routers import DefaultRouter
from market.views import ProductViewSet, OrderViewSet, SignboardViewSet, CorsViewSet

router = DefaultRouter()
router.register("products", ProductViewSet)
router.register("signboards", SignboardViewSet)
router.register("orders", OrderViewSet)
router.register("check_cors", CorsViewSet)

urlpatterns = router.urls

app_name = "market"
