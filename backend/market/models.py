import os

from cloudinary.models import CloudinaryField
from webcolors import names as css_colors
from random import (
    uniform as _setdefault_float_value,
    triangular as _setdefault_int_value,
)
import uuid

from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.db.models import F
from django.conf import settings
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

CSS3_COLORS = frozenset(map(str.upper, css_colors("css3")))


def _color_validator(colors: list, exception):
    results = []
    for color in colors:
        color = color.upper()
        if color not in CSS3_COLORS:
            raise exception(f"The color '{color}' does not belong to css3 colors")
        results.append(color)
    return results


class Series(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class CategoryChoices(models.TextChoices):
    LAPTOP = "LAPTOP", _("Laptops")
    PC = "PC", _("Desktop PC`s")
    NETWORK_DEVICE = "NETWORK_DEVICE", _("Networking devices")
    PRINTER_SCANNER = "PRINTER_SCANNER", _("Printers & Scanners")
    PC_PART = "PC_PART", _("PC parts")
    OTHER = "OTHER", _("Others product")


class Product(models.Model):
    name = models.CharField(max_length=62, unique=True)
    category = models.CharField(max_length=20, choices=CategoryChoices.choices)
    series = models.ForeignKey(
        Series, on_delete=models.CASCADE, related_name="products"
    )
    stock_quantity = models.PositiveSmallIntegerField()
    original_price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=(MinValueValidator(0),)
    )
    sale_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        validators=(MinValueValidator(0),),
    )
    characteristics = models.JSONField(default=dict, null=True, blank=True)
    colors = ArrayField(models.CharField(max_length=20))
    current_color = models.CharField(max_length=20)
    description = models.TextField(blank=True, null=True)

    rating_avg = models.FloatField()
    reviews = models.PositiveSmallIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    @property
    def actual_price(self):
        """
        if sale_price is null, returned original_price,
        used for calculations in orders
        """
        return self.sale_price or self.original_price

    def clean(self):
        if self.sale_price and self.sale_price >= self.original_price:
            raise ValidationError(
                "The sale price must be lower than the original price."
            )
        self.colors = _color_validator(self.colors, ValidationError)

    def save(self, *args, **kwargs):
        # test save
        if not self.pk:
            self.rating_avg = round(_setdefault_float_value(1.0, 5.0), 2)
            self.reviews = _setdefault_int_value(3, 52, 10)
        # --------

        self.full_clean()
        super().save(*args, **kwargs)


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = CloudinaryField("TechMarketProducts")


class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders"
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="order_items"
    )
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.GeneratedField(
        expression=F("unit_price") * F("quantity"),
        output_field=models.DecimalField(max_digits=10, decimal_places=2),
        db_persist=True,
    )

    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields=("product", "order"), name="unique_order_items"
            ),
        )


class Signboard(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    image = CloudinaryField("TechMarketSignboards") # TODO visual url

    class Meta:
        ordering = ["-added_at"]


# not used
class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_reviews"
    )
    grade = models.PositiveSmallIntegerField(
        validators=(MinValueValidator(1), MaxValueValidator(5)),
    )
    comment = models.CharField(max_length=512)
