from django.conf import settings
from django.db import models
from django.utils.text import gettext_lazy as _
from django.contrib.sessions.models import Session
from django_countries.fields import CountryField


class DeviceChoices(models.TextChoices):
    DESKTOP = "DESKTOP", _("Desktop")
    MOBILE  = "MOBILE",  _("Mobile")
    TABLET  = "TABLET",  _("Tablet")
    BOT     = "BOT",     _("Bot")
    UNKNOWN = "UNKNOWN", _("Unknown")


class BrowserChoices(models.TextChoices):
    CHROME  = "CHROME",  _("Chrome")
    SAFARI  = "SAFARI",  _("Safari")
    EDGE    = "EDGE",    _("Edge")
    FIREFOX = "FIREFOX", _("Firefox")
    OTHER   = "OTHER",   _("Other")


class ContinentChoices(models.TextChoices):
    ASIA          = "ASIA",          _("Asia")
    AFRICA        = "AFRICA",        _("Africa")
    NORTH_AMERICA = "NORTH_AMERICA", _("North America")
    SOUTH_AMERICA = "SOUTH_AMERICA", _("South America")
    ANTARCTICA    = "ANTARCTICA",    _("Antarctica")
    EUROPE        = "EUROPE",        _("Europe")
    OCEANIA       = "OCEANIA",       _("Oceania")


class SessionParameters(models.Model):
    started_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    # session_id = models.OneToOneField(Session, on_delete=models.SET_NULL, null=True)
    device = models.CharField(max_length=7, choices=DeviceChoices.choices)
    browser = models.CharField(max_length=15, choices=BrowserChoices.choices)
    continent = models.CharField(max_length=13, choices=ContinentChoices.choices, null=True)
    country = CountryField(null=True)
    # channel field not implemented


# class EventChoices(models.TextChoices):
#         FIRST_VISIT          = "FIRST_VISIT",         _("First visit")
#         BEGIN_CHECKOUT       = "BEGIN_CHECKOUT",      _("Begin checkout")
#         PAGE_VIEW            = "PAGE_VIEW",           _("Page view")
#         VIEW_ITEM            = "VIEW_ITEM",           _("View item")
#         VIEW_SEARCH_RESULTS  = "VIEW_SEARCH_RESULTS", _("View search results")
#         ADD_PAYMENT_INFO     = "ADD_PAYMENT_INFO",    _("Add payment info")
#         ADD_TO_CART          = "ADD_TO_CART",         _("Add to cart")
#         VIEW_ITEM_LIST       = "VIEW_ITEM_LIST",      _("View item list")
#         SELECT_ITEM          = "SELECT_ITEM",         _("Select item")
#         PURCHASE             = "PURCHASE",            _("Purchase")
#
#
# class Event(models.Model):
#     session_parameters = models.ForeignKey(SessionParameters, on_delete=models.CASCADE)
#     event_name = models.CharField()
#     timestamp = models.DateTimeField(auto_now_add=True)
