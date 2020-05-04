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


from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class Permit2(permissions.BasePermission):
    message = "Access Denied"

    def has_permission(self, request, view):
        try:
            s = Salesperson.objects.get(User_ref=request.user)
            return True
        except:
            return False
