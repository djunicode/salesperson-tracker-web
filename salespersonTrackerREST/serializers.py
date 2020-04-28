from rest_framework import serializers
from .models import *


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = "__all__"


class DailyTargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTarget
        fields = "__all__"


class ItemAssignSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemAssign
        fields = [
            "Item_Ref",
            "Assign_Date",
            "Assign_Time",
            "Assigned_By",
            "Assigned_To",
            "assign_quantity",
        ]


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = warehouse
        fields = [
            "Item_Group_Code",
            "Company_Item_code",
            "Company_Code",
            "Name",
            "Description",
            "Quantity",
        ]


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"
