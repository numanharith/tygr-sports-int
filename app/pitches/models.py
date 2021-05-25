from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Pitch(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField("Name", max_length=240)
    location = models.CharField("Location", max_length=240)
    imgurl = models.CharField(max_length=255, default="url")
    size = models.IntegerField()

class Bookmark(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    user = models.ForeignKey(User, related_name="users_bookmarks", on_delete=models.CASCADE)
    pitch = models.ForeignKey(Pitch, related_name="users_pitches", on_delete=models.CASCADE)