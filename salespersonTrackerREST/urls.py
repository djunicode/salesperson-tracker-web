from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r"daily_target", views.DailyTargetView, basename="daily_target")
router.register(r"bill", views.BillView, basename="bill")
router.register(r"manager", views.ManagerViewSet)
router.register(r"user", views.UserViewSet)
router.register(r"salesperson", views.SalespersonViewSet)
router.register(r"warehouse", views.WarehouseViewSet)
router.register(r"inventory", views.InventoryViewSet)
# router.register(r'targets_completed', TargetsCompletedView)


urlpatterns = [
    path("SignIn", views.SignIn, name="SignIn"),
    # path('VerifyChangePassword/<slug:timestamp/<slug:username>/',views.VerifyChangePassword,name='VerifyChangePassowrd'),
    path("ChangePassword", views.ChangePassword, name="ChangePassword"),
    path("Logout", views.Logout, name="Logout"),
    path("AddSalesperson", views.AddSalesperson.as_view(), name="AddSalesPerson"),
    path("GetCoordinates", views.GetCoordinates.as_view(), name="GetCoordinates"),
    path(
        "GetSalespersonData", views.SalespersonData.as_view(), name="GetSalespersonData"
    ),
    # path("Test", views.Test, name="Test"),
    # path("accept", views.accept, name="accept"),
    # path('daily_target',DailyTargetView.as_view(),name='daily_target'),
    # path('bill', BillView.as_view(),name='bill'),
    path(
        "Salesperson/<int:pk>/Add",
        views.AddToInventory.as_view(),
        name="AddToInventory",
    ),
    path("InventoryList", views.InventoryList.as_view(), name="InventoryList"),
    path("ManagerPopulate", views.ManagerPopulate, name="ManagerPopulate"),
    path("SalespersonPopulate", views.SalespersonPopulate, name="SalespersonPopulate"),
    # path("UpdateCoordinates", views.UpdateCoordinates.as_view(), name="UpdateCoordinates"),
    path("warehouse", views.WarehouseView.as_view(), name="WarehouseView"),
    path("ItemAssign", views.ItemAssignView.as_view(), name="ItemAssignView"),
]

urlpatterns += router.urls
