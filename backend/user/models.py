import os
import uuid

from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db import models


class User(AbstractUser):
    icon = CloudinaryField("UserAvatar", null=True, blank=True)
    email = models.EmailField(unique=True)

    @property
    def get_avatar(self):
        return self.icon.build_url(fetch_format="auto", quality="auto").rsplit(".", 1)[0] if self.icon else ""

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
