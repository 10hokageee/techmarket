from rest_framework.pagination import PageNumberPagination, BasePagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param


class ProductHomePagePagination(BasePagination):
    page_size = 8

    def paginate_queryset(self, queryset, request, view=None):
        try:
            display_page_number = int(request.query_params.get("page", 1))
        except ValueError:
            display_page_number = 1
        else:
            if display_page_number <= 0:
                display_page_number = 1

        start = (display_page_number - 1) * self.page_size
        end = start + self.page_size

        results = list(queryset[start:end])

        self.request = request
        self.display_page_number = display_page_number
        self.display_next_page = display_page_number + 1 if len(results) == self.page_size else None
        self.display_previous_page = display_page_number - 1 if display_page_number > 1 else None

        return results


    def get_next_link(self):
        return replace_query_param(
            self.request.build_absolute_uri(), "page", self.display_next_page
        )


    def get_previous_link(self):
        return replace_query_param(
            self.request.build_absolute_uri(), "page", self.display_previous_page
        )


    def get_paginated_response(self, data):
        response_data = {
            "current_page": self.display_page_number,
            "results": data,
        }
        if self.display_next_page:
            response_data["next_page"] = self.get_next_link()
        if self.display_previous_page:
            response_data["previous_page"] = self.get_previous_link()
        return Response(
            response_data,
        )
