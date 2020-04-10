from rest_framework import serializers
from .models import Bill, DailyTarget

class BillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Bill
        fields='__all__'

class DailyTarget(serializers.HyperlinkedModelSerializer):
    class Meta:
        model= DailyTarget
        fields='__all__'
