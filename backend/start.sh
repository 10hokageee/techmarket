#!/usr/bin/env sh

python manage.py migrate
python manage.py collectstatic --noinput
gunicorn --workers 1 --threads 2 --bind 0.0.0.0:8000 techmarketAPI.wsgi:application
