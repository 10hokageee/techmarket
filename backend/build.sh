#!/usr/bin/env sh

python manage.py migrate --no-input
python manage.py collectstatic --no-input
gunicorn --workers 1 --threads 2 --bind 0.0.0.0:${PORT:-10000} techmarketAPI.wsgi:application & python manage.py qcluster
