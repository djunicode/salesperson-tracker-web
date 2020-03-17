from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# Using Custom Django User Model
# Managers be created via the admin only
# Initially give managers same  password give them access to reset password
# username:employee_id


class Manager(models.Model):
    user_ref = models.ForeignKey(User, on_delete=models.CASCADE)
    Name = models.CharField(max_length=100)
    Photo = models.ImageField(upload_to="managers")
    Age = models.IntegerField()

    def __str__(self):
        return self.user_ref.username


# Salesperson will also be created via the admin only
# give salesperson the same password provide a link to reset their passwords
# username:employee_id


class Salesperson(models.Model):
    User_ref = models.ForeignKey(User, on_delete=models.CASCADE)
    Managed_By = models.ForeignKey(Manager, models.SET_NULL, null=True, blank=True)
    Name = models.CharField(max_length=100)
    Photo = models.ImageField(upload_to="salesperson")
    Age = models.IntegerField()
    last_location_lat = models.FloatField()
    last_location_long = models.FloatField()

    def __str__(self):
        return self.User_ref.username


# Item_Group_Code:
# Classify items into their respective domains,like for eg a Toshiba Tv and a Samsung Tv can be grouped togheter under one roof named TV
# Company_item_code:A company can produce many diffrent models of Tv,hence to classify these models under one Manufacturer Equipment
# They will be diffrent from each other by their item_code(i.e Barcode)


# Item model is more a warehouse,where the mangers can view these items and assign them to the salesperson
class Item(models.Model):
    Item_Code = models.IntegerField(primary_key=True)
    Item_Group_Code = models.IntegerField()
    Company_Item_code = models.IntegerField()
    Company_Code = models.IntegerField()

    Photo = models.ImageField(upload_to="Item")
    Description = models.TextField()

    def __int__(self):
        return self.Item_Code


class ItemAssign(models.Model):
    Item_Ref = models.ForeignKey(Item, on_delete=models.CASCADE)
    Assigned_By = models.ForeignKey(Manager, models.SET_NULL, null=True, blank=True)
    Assigned_To = models.ForeignKey(Salesperson, models.SET_NULL, null=True, blank=True)
    Assign_Date = models.DateField()
    Assign_Time = models.TimeField()

    def __str__(self):
        return self.Item_Ref


class Inventory(models.Model):
    Salesperson_Ref = models.ForeignKey(Salesperson, on_delete=models.CASCADE)
    item_Ref = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return self.Salesperson_Ref


class Bill(models.Model):
    Item_Ref = models.ForeignKey(Item, on_delete=models.CASCADE)
    Issued_To = models.CharField(max_length=100)
    Salesperson_Ref = models.ForeignKey(
        Salesperson, models.SET_NULL, null=True, blank=True
    )
    Buyer_Contact = models.IntegerField()
    Buyer_email = models.CharField(max_length=100)
    SoftCopy = models.FileField(upload_to="Bills")

    def __str__(self):
        return self.Item_Ref


class DailyTarget(models.Model):
    Assigned_By = models.ForeignKey(Manager, models.SET_NULL, blank=True,null=True)
    Assigned_To = models.ForeignKey(Salesperson, on_delete=models.CASCADE)
    Assigned_Date = models.DateField()
    Assigned_Time = models.TimeField()
    Item_Ref = models.ForeignKey(ItemAssign, on_delete=models.CASCADE)
    Quantity = models.IntegerField()
    Completed = models.BooleanField()
    Notes = models.TextField()

class TargetsCompleted(models.Model):
    User_ref=models.ForeignKey(Manager,models.SET_NULL,null=True)
    Task_completed=models.IntegerField()

class TotalTargets(models.Model):
    User_ref=models.ForeignKey(Manager,models.SET_NULL,null=True)
    Task_Assigned=models.IntegerField()
