from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import DailyTargetView, BillView, SignIn, ChangePassword, Logout, WarehouseViewSet, ItemAssignViewSet
from rest_framework import routers




router = routers.DefaultRouter()
router.register(r"daily_target", DailyTargetView, basename="daily_target")
router.register(r"bill", BillView, basename="bill")
# router.register(r'targets_completed', TargetsCompletedView)
router.register('items',WarehouseViewSet)



urlpatterns = [
    path("SignIn", views.SignIn, name="SignIn"),
    # path('VerifyChangePassword/<slug:timestamp/<slug:username>/',views.VerifyChangePassword,name='VerifyChangePassowrd'),
    path("ChangePassword", views.ChangePassword, name="ChangePassword"),
    path("Logout", views.Logout, name="Logout"),
    path("AddSalesperson", views.AddSalesperson.as_view(), name="AddSalesPerson"),
    path("GetCoordinates", views.GetCoordinates.as_view(), name="GetCoordinates"),
    # path("Test", views.Test, name="Test"),
    # path("accept", views.accept, name="accept"),
    # path('daily_target',DailyTargetView.as_view(),name='daily_target'),
    # path('bill', BillView.as_view(),name='bill'),
    path("Salesperson/<int:pk>/Add",views.AddToInventory.as_view(), name="AddToInventory"),
    path("InventoryList",views.InventoryList.as_view(), name="InventoryList")
]

urlpatterns += router.urls
