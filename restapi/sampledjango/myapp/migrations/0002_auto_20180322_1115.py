# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-22 11:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contacts',
            name='phonenumber',
            field=models.BigIntegerField(default=0),
        ),
    ]
