from rest_framework.pagination import PageNumberPagination, BasePagination
from rest_framework.response import Response
from rest_framework.utils.urls import replace_query_param


class ProductHomePagePagination(BasePagination):
    page_size = 8

    def paginate_queryset(self, queryset, request, view=None):
        self.request = request
        try:
            display_page_number = max(1, int(request.query_params.get("page", 1)))
        except ValueError:
            display_page_number = 1

        start = (display_page_number - 1) * self.page_size
        end = start + self.page_size + 1  # + 1 for check next page value

        results = list(queryset[start:end])

        self.display_page_number = display_page_number

        if len(results) > self.page_size:
            self.display_next_page = display_page_number + 1
            results = results[:self.page_size]
        else:
            self.display_next_page = None

        self.display_previous_page = (
            display_page_number - 1 if display_page_number > 1 else None
        )
        return results

    def get_next_link(self):
        if self.display_next_page:
            return replace_query_param(
                self.request.build_absolute_uri(), "page", self.display_next_page
            )

    def get_previous_link(self):
        if self.display_previous_page:
            return replace_query_param(
                self.request.build_absolute_uri(), "page", self.display_previous_page
            )

    def get_paginated_response(self, data):
        return Response(
            {
                "current_page": self.display_page_number,
                "next_page": self.get_next_link(),
                "previous_page": self.get_previous_link(),
                "results": data,
            },
        )
