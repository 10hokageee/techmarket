import json
from datetime import timedelta

import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.timezone import now
from django.db.models import F, Value
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from market.models import Order, Product, OrderItem
from payments.models import Payment
from payments.tasks import create_stripe_session

WEBHOOK_KEY = settings.STRIPE_WEBHOOK_KEY
UPDATE_PAYMENT_MINUTES = 20


def _order_rollback(order: Order):
    def generator(order: Order) -> Product:
        items = order.items.all()
        for item in items:
            item.product.stock_quantity = F("stock_quantity") + Value(item.quantity)
            yield item.product

    Product.objects.bulk_update(generator(order), ("stock_quantity",))


def _update_payment(
    order_pk: int, field_to_update: str, value_to_update: str, prefetch: bool = False
) -> Payment:
    payment = Payment.objects
    obj = (
        payment.prefetch_related("order__items__product").get(order_id=order_pk)
        if prefetch
        else payment.get(order_id=order_pk)
    )
    setattr(obj, field_to_update, value_to_update)
    obj.save(update_fields=(field_to_update,))
    return obj


@csrf_exempt
@api_view(["POST"])
@permission_classes(())
def payment_webhook(request):
    payload = request.body
    try:
        sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_KEY)
    except (ValueError, stripe.error.SignatureVerificationError):
        return Response(status=status.HTTP_403_FORBIDDEN)
    except KeyError:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    event_obj = event.data.object
    if (metadata := getattr(event_obj, "metadata", None)) and (
        order_pk := metadata.get("order")
    ):
        match event.type:
            case "checkout.session.completed":
                _update_payment(order_pk, "status", "PAID")
            case "charge.succeeded":
                _update_payment(order_pk, "receipt", event_obj.receipt_url)
            case "checkout.session.expired":
                payment = _update_payment(order_pk, "status", "CANCELED", prefetch=True)
                _order_rollback(payment.order)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


def create_payment_forced(
    order_pk: int,
    user: settings.AUTH_USER_MODEL,
) -> None:
    try:
        order = Order.objects.prefetch_related("items__product").get(
            id=order_pk, user=user
        )
    except Order.DoesNotExist:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={"Order Error": "Order not found or you are not its owner"},
        )
    else:
        create_stripe_session(order=order)
    return Response(status=status.HTTP_200_OK)


# Can be used if the payment is created asynchronously
@csrf_exempt
@api_view([])  # add the POST method here
def update_payment(request):
    if order_pk := request.data.get("order"):
        try:
            payment = Payment.objects.select_related("order__user").get(
                order_id=order_pk, order__user=request.user
            )
        except Payment.DoesNotExist:
            # TODO add 20 minutes validation
            return create_payment_forced(order_pk=order_pk, user=request.user)
        else:
            payment_datetime = payment.created_at
            check_timedelta = timedelta(minutes=UPDATE_PAYMENT_MINUTES)

            if payment.status == "PAID":
                return Response(
                    status=status.HTTP_403_FORBIDDEN,
                    data={"Payment Error": "This payment cannot be changed"},
                )
            elif (now() - payment_datetime) > check_timedelta:
                # async_task(..., payment=payment)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(
                    status=status.HTTP_403_FORBIDDEN,
                    data={
                        "Payment Error": "Payment updates are only allowed every 20 minutes"
                    },
                )
    return Response(
        status=status.HTTP_400_BAD_REQUEST,
        data={
            "Order Error": "You need to pass the 'order' parameter in the request body"
        },
    )
