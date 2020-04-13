from rest_framework import serializers
from .models import Bill, DailyTarget

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bill
        fields='__all__'

class DailyTargetSerializer(serializers.ModelSerializer):
    class Meta:
        model= DailyTarget
        fields='__all__'
