from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pitch


class PitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitch
        fields = "__all__"