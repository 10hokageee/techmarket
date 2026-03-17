FROM python:3.14-alpine

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE=techmarketAPI.settings

WORKDIR /techmarket

COPY requirements.txt /techmarket/
RUN python -m pip install --no-cache-dir -r requirements.txt

RUN addgroup -S django && adduser -S -G django -H tech_user
RUN mkdir -p /techmarket/staticfiles && chown -R tech_user:django /techmarket
COPY --chown=tech_user:django . /techmarket/
USER tech_user

