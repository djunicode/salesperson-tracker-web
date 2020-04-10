from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from .views import DailyTargetView, BillView, SignIn, ChangePassword, Logout
from rest_framework import routers


router=routers.SimpleRouter()
router.register(r'daily_target', DailyTargetView)
router.register(r'bill', BillView)
#router.register(r'targets_completed', TargetsCompletedView)


urlpatterns = [
    path("SignIn", SignIn, name="SignIn"),
    # path('VerifyChangePassword/<slug:timestamp/<slug:username>/',views.VerifyChangePassword,name='VerifyChangePassowrd'),
    path("ChangePassword", ChangePassword, name="ChangePassword"),
    path("Logout", 
    Logout, name="Logout"),
    # path("accept", views.accept, name="accept"),
]

urlpatterns += router.urls