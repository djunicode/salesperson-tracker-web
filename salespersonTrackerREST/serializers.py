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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class ManagerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Manager
        fields = ["user_ref", "Name", "Photo", "Age"]


class SalespersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Salesperson
        fields = "__all__"


class WarehouseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Warehouse
        fields = "__all__"


class InventorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"
