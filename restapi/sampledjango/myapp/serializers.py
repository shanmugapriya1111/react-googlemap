from rest_framework import serializers
from myapp.models import Contacts

class ContactSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contacts
        fields = ('id','firstname','lastname','email','phonenumber','address')
        