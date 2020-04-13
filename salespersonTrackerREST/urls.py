from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import DailyTargetView, BillView, SignIn, ChangePassword, Logout
from rest_framework import routers


router=routers.DefaultRouter()
router.register(r'daily_target', DailyTargetView, basename='daily_target')
router.register(r'bill', BillView, basename='bill')
#router.register(r'targets_completed', TargetsCompletedView)


urlpatterns = [
    path("SignIn", SignIn, name="SignIn"),
    # path('VerifyChangePassword/<slug:timestamp/<slug:username>/',views.VerifyChangePassword,name='VerifyChangePassowrd'),
    path("ChangePassword", ChangePassword, name="ChangePassword"),
    path("Logout", Logout, name="Logout"),
    #path('daily_target',DailyTargetView.as_view(),name='daily_target'),
    #path('bill', BillView.as_view(),name='bill'),
    # path("accept", views.accept, name="accept"),
    path("home", views.home, name="home"),
]

urlpatterns += router.urls

