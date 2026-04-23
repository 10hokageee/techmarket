from django.db.models import Q
from django.utils.timezone import localtime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK

from analytics.models import SessionParameters


class SessionParametersDevView(APIView):
    def get(self, request):
        queryset = SessionParameters.objects.select_related("user").exclude(
            (Q(device="UNKNOWN") | Q(device="BOT"))
            & Q(browser="OTHER")
            & Q(continent="NORTH AMERICA")
            & Q(country="US")
            & Q(user__isnull=True)
        )

        result = [
            {
                "id": obj.pk,
                "started_at": localtime(obj.started_at),
                "device": obj.device,
                "browser": obj.browser,
                "continent": obj.continent,
                "country": obj.country.name,
                "countryCode": obj.country.code,
                "user-username": obj.user.username if obj.user else None,
            }
            for obj in queryset
        ]
        return Response(status=HTTP_200_OK, data=result)
