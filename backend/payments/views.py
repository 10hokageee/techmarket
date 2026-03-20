import json
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from payments.models import Payment

WEBHOOK_KEY = settings.STRIPE_WEBHOOK_KEY


@csrf_exempt
@api_view(["POST"])
@permission_classes(())
def payment_webhook(request):
    payload = request.body
    try:
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]

        # for development
        # event = stripe.Event.construct_from(
        #     json.loads(payload), settings.STRIPE_PRIVATE_KEY
        # )

        # for production
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_KEY)

    except (ValueError, KeyError, stripe.error.SignatureVerificationError):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    event_obj = event.data.object
    if (metadata := getattr(event_obj, "metadata", None)) and (order_pk := metadata.get("order")):
        payment = Payment.objects.get(order_id=order_pk)
        match event.type:
            case "checkout.session.completed":
                payment.status = "PAID"
            case "charge.succeeded":
                payment._check = event_obj.receipt_url
            case "checkout.session.expired":
                payment.status = "CANCELED"
        payment.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
