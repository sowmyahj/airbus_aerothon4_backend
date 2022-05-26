from pyexpat import model
from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=100,blank=False)
    password = models.CharField(max_length=100,blank=False)