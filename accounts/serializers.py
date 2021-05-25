from django.contrib.auth.models import User
from rest_framework import serializers
from pitches.models import Pitch
from pitches.serializers import *

class BookmarkSerializer(serializers.ModelSerializer):
    pitch = PitchSerializer(read_only=True)
    class Meta:
        model=Pitch
        # fields = '__all__'
        exclude = ['user','id']
    
class UserSerializer(serializers.ModelSerializer):
    users_bookmarks = BookmarkSerializer(read_only=True,many=True)
 
    class Meta:
        model=User
        fields = ['first_name', 'last_name', 'username',  'email', 'password', 'users_bookmarks']
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    
    def create(self, validated_data):
        user = super().create(validated_data)
        # this is for hashing password
        user.set_password(validated_data['password'])
        user.save()
        return user