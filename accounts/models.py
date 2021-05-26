from django.core import validators
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
import uuid

class Position(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(max_length=50)

class Profile(models.Model):
    mobile = models.IntegerField(validators=[MinValueValidator(80000000), MaxValueValidator(99999999)])
    height = models.IntegerField(validators=[MaxValueValidator(250)])
    weight = models.IntegerField(validators=[MaxValueValidator(300)])
    position = models.ForeignKey(Position, related_name="positions_bookmarks", on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


