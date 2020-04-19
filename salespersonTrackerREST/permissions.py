from rest_framework import permissions
from .models import *
from django.contrib.auth.models import User
from requests.api import request


class Permit(permissions.BasePermission):
    message = "Access Denied"

    def has_permission(self, request, view):
        try:
            m = Manager.objects.get(user_ref=request.user)
            return True
        except:
            return False
