from rest_framework.routers import DefaultRouter
from market.views import ProductViewSet

router = DefaultRouter()
router.register("", ProductViewSet)

urlpatterns = router.urls

app_name = "market"
