from django.db import models

# Create your models here.


class Admin(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    vehicle_number = models.CharField(max_length=20)
    contact_info = models.CharField(max_length=100)

class ParkingSlot(models.Model):
    slot_number = models.CharField(max_length=10)
    is_occupied = models.BooleanField(default=False)
    reserved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    reserved_at = models.DateTimeField(blank=True, null=True)