from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"


class DailyTargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTarget
        fields = "__all__"

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['username']

class SalespersonSerializer(serializers.ModelSerializer):
    User_ref=Userserializer(many=False,read_only=True)
    class Meta:
        model = Salesperson
        fields = ['id','User_ref','Managed_By','Name','Photo','Age','last_location_lat','last_location_long','isLoggedin']
