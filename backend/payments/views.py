import json
from datetime import timedelta

import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
from django_q.tasks import async_task
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from payments.models import Payment

WEBHOOK_KEY = settings.STRIPE_WEBHOOK_KEY
UPDATE_PAYMENT_MINUTES = 20


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
    if (metadata := getattr(event_obj, "metadata", None)) and (
        order_pk := metadata.get("order")
    ):
        payment = Payment.objects.get(order_id=order_pk)
        match event.type:
            case "checkout.session.completed":
                payment.status = "PAID"
            case "charge.succeeded":
                payment.receipt = event_obj.receipt_url
            case "checkout.session.expired":
                payment.status = "CANCELED"
        payment.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["POST"])
def update_payment(request):
    if order_pk := request.data.get("order"):
        try:
            payment = Payment.objects.select_related("order__user").get(order_id=order_pk, order__user=request.user)
        except Payment.DoesNotExist:
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data={"Order Error": "Order not found or you are not its owner"}
            )
        else:
            payment_datetime = payment.created_at
            check_timedelta = timedelta(minutes=UPDATE_PAYMENT_MINUTES)

            if payment.status == "PAID":
                return Response(status=status.HTTP_403_FORBIDDEN, data={"Payment Error": "This payment cannot be changed"})

            if (now() - payment_datetime) > check_timedelta:
                # async_task(..., payment=payment)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN, data={"Payment Error": "Payment updates are only allowed every 20 minutes"})
    return Response(status=status.HTTP_400_BAD_REQUEST, data={"Order Error": "You need to pass the 'order' parameter in the request body"})
