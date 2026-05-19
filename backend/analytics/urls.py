from django.urls import path
from analytics.views import CollectAnalyticsView

urlpatterns = [
    path("events/", CollectAnalyticsView.as_view()),
]

app_name = "analytics"
