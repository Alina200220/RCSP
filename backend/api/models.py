from django.db import models

class Aparts(models.Model):
    address=models.CharField(max_length=250,blank=True)
    floor = models.IntegerField(blank=True)
    floor_amount=models.IntegerField(default=0,blank=True)
    rooms = models.CharField(max_length=100,blank=True)
    metres = models.FloatField(blank=True)
    kitchen=models.IntegerField(default=0,blank=True)
    repair=models.CharField(max_length=30,blank=True)
    metro = models.CharField(max_length=30,blank=True)
    time_to_metro=models.IntegerField(default=0,blank=True)
    year_house=models.IntegerField(default=0,blank=True)


