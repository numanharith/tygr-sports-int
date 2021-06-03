from rest_framework import serializers, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import *
from base.serializers import PitchSerializer, UserSerializer, UserSerializerWithToken


@api_view(["GET"])
def getPitches(request):
    pitches = Pitch.objects.all()
    serializer = PitchSerializer(pitches, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getPitch(request, pk):
    pitch = Pitch.objects.get(pk=pk)
    serializer = PitchSerializer(pitch, many=False)
    return Response(serializer.data)