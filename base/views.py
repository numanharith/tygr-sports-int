from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import PitchSerializer


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