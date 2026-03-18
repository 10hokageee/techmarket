from django.urls import path
from payments.views import payment_webhook

urlpatterns = [
    path("", payment_webhook),
]

app_name = "payments"
