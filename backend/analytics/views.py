from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from analytics.models import SessionParameters, Event

events_data_dict = {
    "page_view": "page_path",
    "view_item": "page_path",
    "view_search_results": "search_term",
    "add_to_cart": "product_name",
    "view_item_list": "item_list_name",
    "select_item": "product_name",
}


class CollectAnalyticsView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request):
        data = request.data
        if not isinstance(data, dict):
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"error": "Events may be a dict type"},
            )
        if "event" not in data:
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data={"error": "Event not valid"}
            )
        try:
            data_name = events_data_dict.get(data["event"])
            session = SessionParameters.objects.get(access_token=str(request.auth))
            Event.objects.create(
                session_parameters=session,
                event_name=data["event"],
                event_data=data.get(data_name),
            )
            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(
                status=status.HTTP_409_CONFLICT,
                data={"error": "Structure not valid to add analytics"},
            )
