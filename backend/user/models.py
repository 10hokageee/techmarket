import os
import uuid

from cloudinary.models import CloudinaryField
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db import models


def _uuid_photo_save(instance: "Product", filename: str):
    _, ext = os.path.splitext(filename)
    return os.path.join(
        "user_icons", f"{slugify(instance.username)}-{uuid.uuid4()}{ext}"
    )


class User(AbstractUser):
    icon = CloudinaryField("UserAvatar", null=True, blank=True)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
