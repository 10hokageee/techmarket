import stripe
import time
from decimal import Decimal
from django.conf import settings
from django.db.models import QuerySet
from market.models import Order, OrderItem
from payments.models import Payment


def create_stripe_session(order: Order) -> None:
    items = order.items.all()
    stripe.api_key = settings.STRIPE_PRIVATE_KEY
    session = stripe.checkout.Session.create(
        mode="payment",
        payment_intent_data={"metadata": {"order": order.pk}},
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": item.product.get_name,
                        "description": item.product.description,
                    },
                    "unit_amount": int(item.unit_price * 100),
                },
                "quantity": item.quantity,
            }
            for item in items
        ],
        metadata={"order": order.pk},
        success_url="https://google.com",
        cancel_url="https://google.com",
    )
    Payment.objects.create(
        session_url=session.url,
        session_id=session.id,
        status=session.payment_status.upper(),
        money_to_pay=Decimal(session.amount_total) / 100,
        order=order,
    )
