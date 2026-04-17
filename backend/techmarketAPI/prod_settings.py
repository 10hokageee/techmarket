import os
from techmarketAPI.object_settings import *
import cloudinary

ENV_PARAMS = (
    "DJANGO_SECRET_KEY",
    "CSRF_TRUSTED_ORIGINS",
    "DEBUG",
    "ALLOWED_HOSTS",
    "DATABASE_URL",
    "STRIPE_PRIVATE_KEY",
    "STRIPE_WEBHOOK_KEY",
    "CLOUD_NAME",
    "API_KEY",
    "API_SECRET",
)

# Checking environment variables
for key in ENV_PARAMS:
    if os.getenv(key) is None:
        raise EnvironmentError(f"Environment variable {key} not specified")

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = os.environ["DEBUG"].upper() == "TRUE"
ALLOWED_HOSTS = os.environ["ALLOWED_HOSTS"].split(",")
INTERNAL_IPS = ["127.0.0.1", "localhost"]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

DATABASES = {
    "default": dj_database_url.config(
        conn_max_age=600,
    )
}

STRIPE_PRIVATE_KEY = os.environ["STRIPE_PRIVATE_KEY"]
STRIPE_WEBHOOK_KEY = os.environ["STRIPE_WEBHOOK_KEY"]


CORS_ALLOWED_ORIGINS = os.environ["CSRF_TRUSTED_ORIGINS"].split(",")
CSRF_TRUSTED_ORIGINS = os.environ["CSRF_TRUSTED_ORIGINS"].split(",")
CORS_ALLOW_CREDENTIALS = True

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.environ["CLOUD_NAME"],
    "API_KEY": os.environ["API_KEY"],
    "API_SECRET": os.environ["API_SECRET"],
}

cloudinary.config(
    cloud_name=os.environ["CLOUD_NAME"],
    api_key=os.environ["API_KEY"],
    api_secret=os.environ["API_SECRET"],
    secure=True,
)
