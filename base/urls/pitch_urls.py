from django.urls import path
from base.views import pitch_views as views

urlpatterns = [
    path("", views.getPitches, name="pitches"),
    path("<uuid:pk>/", views.getPitch, name="pitch"),
]