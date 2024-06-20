from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.


class Admin(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    password = models.CharField(max_length=100)

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

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slot = models.ForeignKey(ParkingSlot, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
