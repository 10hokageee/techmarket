import os
from .object_settings import *

ENV_PARAMS = (
    "DJANGO_SECRET_KEY",
    "DEBUG",
    "ALLOWED_HOSTS",
    "DATABASE_URL",
    "STRIPE_PRIVATE_KEY",
    "STRIPE_WEBHOOK_URL",
)

# Checking environment variables
for key in ENV_PARAMS:
    if os.getenv(key) is None:
        raise EnvironmentError(f"Environment variable {key} not specified")

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
DEBUG = os.environ["DEBUG"].upper() == "TRUE"
ALLOWED_HOSTS = set(os.environ["ALLOWED_HOSTS"].split(","))

# The model structure requires a PostgreSQL database.
DATABASES = {
    "default": dj_database_url.config(
        conn_max_age=600,
    )
}

STRIPE_PRIVATE_KEY = os.environ["STRIPE_PRIVATE_KEY"]
STRIPE_WEBHOOK_KEY = os.environ["STRIPE_WEBHOOK_KEY"]

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOWED_ORIGINS = os.getenv(
#     "CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
# ).split(",")
