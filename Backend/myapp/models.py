from django.db import models
from django.contrib.auth.models import Group, Permission, User
from datetime import date
from django.utils import timezone


# Create your models here.

class Movies(models.Model):
    
    Movie_Name=models.CharField(max_length=1000)
    Year=models.CharField(max_length=100)
    Genre=models.CharField(max_length=1000)
    Rating=models.CharField(max_length=1000)
    One_Line=models.CharField(max_length=100000)
    Stars=models.CharField(max_length=100000)
    Votes=models.CharField(max_length=100000)
    Run_Time=models.CharField(max_length=100000)
    Gross=models.CharField(max_length=100000)
    Date=models.DateTimeField(default=timezone.now)
    

    class Meta:
        db_table = 'Movies'
