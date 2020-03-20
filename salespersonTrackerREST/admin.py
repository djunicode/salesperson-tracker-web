from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Manager)
admin.site.register(Salesperson)
admin.site.register(Item)
admin.site.register(ItemAssign)
admin.site.register(Inventory)
admin.site.register(Bill)
admin.site.register(DailyTarget)
admin.site.register(TargetsCompleted)
admin.site.register(TotalTargets)
