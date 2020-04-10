from rest_framework import serializers
from .models import DailyTarget, Bill


class DailyTargetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=DailyTarget
        fields= '__all__'


'''class TargetsCompletedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=TargetsCompleted
        fields='__all__' '''

class BillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model=Bill
        fields='__all__'
