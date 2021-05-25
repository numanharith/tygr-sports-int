from pitches.serializers import PitchSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view  
from pitches.models import *
from pitches.serializers import *

# Create your views here.
@api_view(['GET', 'POST'])
def index_views(request):
    pitches = Pitch.objects.all()
    print(pitches)
    serializer = PitchSerializer(pitches, many=True)
    # if request.method == 'GET':
    if request.method == 'POST':
        pitch = PitchSerializer(data=request.data)    
        if pitch.is_valid():
            pitch.save()
            return Response({ 'message': 'move is saved' })
    
    return Response(serializer.data)