from django.contrib import admin
from .models import *

admin.site.register(UserProfile)
admin.site.register(Position)
admin.site.register(Pitch)
admin.site.register(Booking)