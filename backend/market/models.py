import os
from random import (
    uniform as _setdefault_float_value,
    triangular as _setdefault_int_value
)
import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import F
from django.conf import settings
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


def _uuid_photo_save(instance: "Product", filename: str):
    value, ext = os.path.splitext(filename)
    if isinstance(instance, Product):
        attr = instance.name
        file_path = "product_images"
    elif isinstance(instance, Signboard):
        attr = value[:52]
        file_path = "signboard_images"
    else:
        raise ValueError("Instance must be of type Product, Signboard")
    return os.path.join(file_path, f"{slugify(attr)}-{uuid.uuid4()}{ext}")


class Series(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY_CHOICES = {
        "LAPTOP": _("Laptops"),
        "PC": _("Desktop PC`s"),
        "NETWORK_DEVICE": _("Networking devices"),
        "PRINTER_SCANNER": _("Printers & Scanners"),
        "PC_PART": _("PC parts"),
        "OTHER": _("Others product"),
    }

    STATUS_CHOICES = {
        "NEW": _("New"),
        "IN_STOCK": _("In stock"),
        "OUT_OF_STOCK": _("Out of stock"),
        "EX_DISPLAY": _("Exit display"),
        "REFURBISHED": _("Refurbished"),
        "DISCONTINUED": _("Discontinued"),
    }

    name = models.CharField(max_length=62)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    series = models.ForeignKey(
        Series, on_delete=models.CASCADE, related_name="products"
    )
    image = models.ImageField(blank=True, upload_to=_uuid_photo_save)
    stock_quantity = models.PositiveSmallIntegerField()
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    rating_avg = models.FloatField()
    reviews = models.PositiveSmallIntegerField()

    def save(self, *args, **kwargs):
        if self.sale_price and self.sale_price > self.original_price:
            raise ValidationError("The sale price must be lower than the original price.")

        # test save
        self.rating_avg = round(
            _setdefault_float_value(1.0, 5.0), 2
        )
        self.reviews = _setdefault_int_value(3, 52, 10)
        # --------

        self.full_clean()
        super().save(*args, **kwargs)


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


class Signboard(models.Model):
    added_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True, upload_to=_uuid_photo_save)

    class Meta:
        ordering = ["-added_at"]


class Review(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reviews"
    )
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="product_reviews"
    )
    grade = models.PositiveSmallIntegerField()
    comment = models.CharField(max_length=512)

    def save(self, *args, **kwargs):
        if 1 <= self.grade >= 5:
            raise ValidationError("Grade must be between 1 and 5")
        super().save(*args, **kwargs)
