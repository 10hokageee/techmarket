import os
import uuid

from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db import models


def _uuid_photo_save(): ...


class User(AbstractUser):
    icon = CloudinaryField("UserAvatar", null=True, blank=True)
    email = models.EmailField(unique=True)

    @property
    def get_avatar(self) -> str:
        return (
            self.icon.build_url(fetch_format="auto", quality="auto").rsplit(".", 1)[0]
            if self.icon
            else None
        )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
