import json
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

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

    except (ValueError, KeyError, stripe.error.SignatureVerificationError) as e:
        print(e)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    _type = event.type
    if _type == "payment_intent.succeeded":
        print("DEV-LOG***Payment intent succeeded***")
    elif _type == "payment_intent.canceled":
        ...
    elif _type == "payment_intent.payment_failed":
        ...
    else:
        ...
    return Response(status=status.HTTP_200_OK)
