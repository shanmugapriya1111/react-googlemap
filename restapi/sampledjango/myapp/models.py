from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Contacts(models.Model):

    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=255, default=None, null=True)
    lastname = models.CharField(max_length=255, default=None, null=True)
    email = models.EmailField(default=None, blank=True)
    phonenumber = models.BigIntegerField(default = 0)
    address =  models.TextField(max_length=255, default=None, null=True)
