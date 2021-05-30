from django.db import models
from django.contrib.auth.models import User
import uuid

class Position(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  positionName = models.CharField(max_length=200)
  positionType = models.CharField(max_length=200)

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  height = models.IntegerField()
  weight = models.IntegerField()
  position = models.ManyToManyField(Position)

class Pitch(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=200)
  address = models.CharField(max_length=200)
  postalCode = models.IntegerField()
  image = models.ImageField(null=True)

  def __str__(self):
    return self.name

class Booking(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  user = models.ManyToManyField(User)
  pitch = models.ForeignKey(Pitch, on_delete=models.CASCADE)
  start = models.DateTimeField()
  end = models.DateTimeField()