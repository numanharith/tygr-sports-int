from django.urls import path
from . import views

urlpatterns = [
    path('pitches/', views.getPitches, name='pitches'),
    path('pitches/<uuid:pk>/', views.getPitch, name='pitch'),
]