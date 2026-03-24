from django.db import models
from django.utils.text import gettext_lazy as _
from market.models import Order


class Payment(models.Model):
    STATUS_CHOICES = (
        ("UNPAID", _("Unpaid")),
        ("PAID", _("Paid")),
        ("CANCELED", _("Canceled")),
    )

    session_id = models.CharField(max_length=100, primary_key=True)
    session_url = models.CharField(max_length=1024)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    money_to_pay = models.DecimalField(max_digits=10, decimal_places=2)
    order = models.OneToOneField(
        Order, on_delete=models.PROTECT, related_name="payment"
    )
    receipt = models.URLField(null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
