from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import exceptions
from django.forms.models import model_to_dict
from django.core.exceptions import ValidationError
from pitches.models import *

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    if request.method == 'POST':
        user = UserSerializer(data=request.data)
        if user.is_valid():
            user.save()
            return Response({ 'message': 'user registered!'})
        else:
            return Response({ 'message': 'user not registered!'})

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'POST':
        User = get_user_model()
        username = request.data.get('username')
        password = request.data.get('password')

        if( username is None) or (password is None):
            raise exceptions.AuthenticationFailed("username or password is required")
        
        user = User.objects.filter(username=username).first()

        if user is None:
            raise exceptions.AuthenticationFailed("user not found")
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed("password is not a match")

        serialized_user = UserSerializer(user).data
        del serialized_user['password']
        
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serialized_user
        })

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def private_view(request):
    if request.method == 'POST':
        pitch_id = request.data.get('pitch')
        if pitch_id is None:
            raise exceptions.ValidationError({ "details" : "pitch id must be sent"})

        try:
            p = Pitch.objects.get(pk=pitch_id)
            bm = Bookmark.objects.create(pitch=p, user=request.user)
            return Response({ "message" : "Added pitch to bookmarks"})
        
        except ValidationError as ex:
            raise exceptions.ValidationError({"details": "input is not valid"})
        
    if request.method == 'GET':
        user = get_user_model().objects.filter(pk=request.user.id).first()
        l = UserSerializer(instance=user).data
        del l['password']
        return Response(l)
