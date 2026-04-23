FROM python:3.14-alpine

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE=techmarketAPI.prod_settings

WORKDIR /techmarket

COPY requirements.txt /techmarket/
RUN python -m pip install --no-cache-dir -r requirements.txt

RUN addgroup -S django && \
    adduser -S -G django tech_user

COPY . /techmarket/
RUN chmod +x /techmarket/build.sh && \
    chown -R tech_user:django /techmarket/ && \
    chmod -R 775 /techmarket/
USER tech_user

CMD ["./build.sh"]
