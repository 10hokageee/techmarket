from django.urls import path
from payments.views import payment_webhook, update_payment

urlpatterns = [
    path("webhooks/", payment_webhook),
    path("update-payment/", update_payment),
]

app_name = "payments"
