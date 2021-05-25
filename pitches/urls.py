from django.urls import path
from pitches.views import *

urlpatterns = [
    path('pitches/', index_views, name='all_pitches'),
]
