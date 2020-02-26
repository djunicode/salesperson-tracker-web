from django.db import models
from . import media
from django.contrib.auth.models import User

class Manager(models.Model):
    pass

class SalesPerson(models.Model):
    username=models.OneToOneField(User, on_delete=models.CASCADE)
    ref_id=models.IntegerField(primary_key=True, verbose_name='salesperson_id')
    name=models.CharField(verbose_name='salesperson_name',max_length=250)
    age=models.IntegerField(verbose_name='salesperson_age')
    photo=models.ImageField(verbose_name='salesperson_photo',upload_to='media')
    lat=models.FloatField(verbose_name='latitude')
    lon=models.FloatField(verbose_name='longitude')
    manager=models.ForeignKey(Manager, on_delete=models.CASCADE)

    def __str__(self):
        return self.ref_id

class CheckPoints(models.Model):
    unique_id=models.IntegerField(primary_key=True, verbose_name='checkpoint_id')
    lat_check=models.FloatField(verbose_name='latitude')
    lon_check=models.FloatField(verbose_name='longitude')
    salesperson=models.ForeignKey(SalesPerson, on_delete=models.CASCADE)

    def __str__(self):
        return self.unique_id

class Stock(models.Model):
    stock_id=models.IntegerField(primary_key=True,verbose_name='stock_uniqueid')
    sales_person=models.ForeignKey(SalesPerson, on_delete=models.CASCADE)
    stock_name=models.CharField(max_length=250)
    stock_type=models.CharField(max_length=120)

    def __str__(self):
        return self.stock_id
    


class Item(models.Model):
    pass
# Create your models here.
