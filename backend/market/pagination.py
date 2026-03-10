from rest_framework.pagination import BasePagination
from rest_framework.response import Response

# custom pagination

# class ProductHomePagePagination(BasePagination):
#     page_size = 8
#
#     def paginate_queryset(self, queryset, request, view=None):
#         if not request.pagination_flag:
#             return None
#
#         self.request = request
#         try:
#             display_page_number = max(1, int(request.query_params.get("page", 1)))
#         except ValueError:
#             display_page_number = 1
#
#         start = (display_page_number - 1) * self.page_size
#         end = start + self.page_size + 1  # + 1 for check next page value
#
#         results = list(queryset[start:end])
#
#         self.display_page_number = display_page_number
#
#         if len(results) > self.page_size:
#             self.display_next_page = display_page_number + 1
#             results = results[: self.page_size]
#         else:
#             self.display_next_page = None
#
#         self.display_previous_page = (
#             display_page_number - 1 if display_page_number > 1 else None
#         )
#         return results
#
#     def get_next_link(self):
#         if self.display_next_page:
#             return replace_query_param(
#                 self.request.build_absolute_uri(), "page", self.display_next_page
#             )
#         return None
#
#     def get_previous_link(self):
#         if self.display_previous_page:
#             return replace_query_param(
#                 self.request.build_absolute_uri(), "page", self.display_previous_page
#             )
#         return None
#
#     def get_paginated_response(self, data):
#         return Response(
#             {
#                 "current_page": self.display_page_number,
#                 "next_page": self.get_next_link(),
#                 "previous_page": self.get_previous_link(),
#                 "results": data,
#             },
#         )


# Simplified version
class ProductCatalogPagination(BasePagination):
    def paginate_queryset(self, queryset, request, view=None):
        if not request.pagination_flag:
            return None
        raw_size = request.query_params.get("perPage")
        page_size = (
            int(raw_size) if raw_size and raw_size in ("4", "8", "16", "32") else 4
        )
        try:
            display_page_number = max(1, int(request.query_params.get("page", 1)))
        except ValueError:
            display_page_number = 1

        start = (display_page_number - 1) * page_size
        end = start + page_size

        return queryset[start:end]

    def get_paginated_response(self, data):
        return Response(data)
