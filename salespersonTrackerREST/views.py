from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
import json
from django.http import JsonResponse, HttpResponse
from rest_framework import generics, status
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils import timezone
import datetime
from django.contrib.auth.decorators import login_required
from .models import *
import base64
from django.utils.html import escape
import ast
from django.contrib.auth.models import User
from .permissions import Permit
from .serializers import *

## Virang ke imports
from rest_framework import viewsets
from rest_framework import response

from .models import DailyTarget, Bill
from rest_framework import permissions as pm


##
from .models import *
from .permissions import IsOwnerOrReadOnly
from .serializers import *


# Username will Remain constant for both Manager and SalesPerson-EmployeeID
# Initilisation Password for manager , Salesperson - init@123
# Authentication Views:
# Test Case:
# Username:60004180036,Password:init@123
@api_view(["POST"])
def SignIn(request):
    Username = request.data["Username"]
    Password = request.data["Password"]
    user = authenticate(request, username=Username, password=Password)

    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        print(token.key)

        login(request, user)

        try:
            m = Manager.objects.get(user_ref=request.user)

            flag = 1
            s = Salesperson.objects.filter(Managed_By=m)
            SalesPerson = []
            for x in s:
                d_Salesperson = {
                    "S_id": x.User_ref.username,
                    "Photo": str("http://127.0.0.1:8000" + x.Photo.url),
                    "Lat": x.last_location_lat,
                    "Long": x.last_location_long,
                }
                SalesPerson.append(d_Salesperson)
                d_Salesperson = {}
            response = {
                "Token": token.key,
                "Flag": 1,
                "Name": m.Name,
                "Photo": str("http://127.0.0.1:8000" + m.Photo.url),
                "SalesPerson": SalesPerson,
            }
            k = m.Photo

            return JsonResponse(response, status=status.HTTP_200_OK)
        except:
            flag = 0
            s = Salesperson.objects.get(User_ref=request.user)
            s.isLoggedin = True
            s.save()

            response = {
                "Token": token.key,
                "S_id": s.User_ref.username,
                "Flag": flag,
                "Name": s.Name,
                "Photo": str("http://127.0.0.1:8000" + s.Photo.url),
                "Lat": s.last_location_lat,
                "Long": s.last_location_long,
            }
            return JsonResponse(response, status=status.HTTP_200_OK)

    else:
        response = {"Flag": -1, "Token": "Null"}
        return JsonResponse(response, status=status.HTTP_400_BAD_REQUEST)


# Create  a self Expiring Token i.e like an OTP to initiate Password Reset
# I.e Sending(GET REQUEST) a timestamp of the request and username to FRONTEND API to compare the current timestamp and the timestamp
# of the request,if the difference is more than 3 hours ,Display Request Expired
# Else accept password and pass the username(obtained from the data sent to API ) to ChnagePassword View
"""@api_view(['POST'])
def VerifyChangePassword(request):
    u_name=request.data['Username']
    n_password=request.data['Password']
    user=User.objects.get(username=u_name)
    timestamp=datetime.datetime.now()
    if user is not None:
        send_mail('Your Password Change Request',
        'You have requested a password Change Click on this Link to Change Your Password {FRONTEND API } ',
        'hrishikesh2pv@gmail.com',
        ['{}'.fromat(user.email)],
        fail_silently=False)
    else:
    """


@api_view(["POST"])
def ChangePassword(request):
    u_name = request.data["Username"]
    n_password = request.data["Password"]
    try:
        user = User.objects.get(username=u_name)

        user.set_password("{}".format(n_password))
        user.save()
        d = {"message": 1}  # Password Reset Successfull
        return JsonResponse(d, status=status.HTTP_200_OK)
    except:
        d = {"message": 0}  # Password Reset Unsuccessfull,Display Invalid Username
        return JsonResponse(d, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
def Logout(request):
    try:
        s = Salesperson.objects.get(User_ref=request.user)
        s.isLoggedin = False
        s.save()
        d = {"message": "LoggedOut"}
        return JsonResponse(d, status=status.HTTP_200_OK)
    except:
        d = {"message": "LoggedOut"}
        return JsonResponse(d, status=status.HTTP_200_OK)


# @api_view(["POST"])
# def accept(request):
#     data=request.data['data']

#     data=ast.literal_eval(data)
#     print(type(data))
#     print(data['data'])
#     x=data['data']
#     print(type(x))
#     for y in x:
#         print(y)
#     return JsonResponse('ok',safe=False)


# @api_view(["POST", "GET"])
# @authentication_classes([TokenAuthentication])
# def Test(request):

#     print(request.user)
#     return JsonResponse("ok", safe=False)


class AddSalesperson(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit,)

    def post(self, request):

        u_name = request.data["Username"]
        try:
            u = User.objects.get(username=u_name)
            try:
                s = Salesperson.objects.get(User_ref=u)
                m = Manager.objects.get(user_ref=request.user)
                if s.Managed_By == None:
                    s.Managed_By = m
                    s.save()
                    data = {"flag": 1, "Message": "Added to your team"}
                    return JsonResponse(data, status=status.HTTP_200_OK)
                else:
                    data = {"flag": 0, "Message": "Already in a Team"}
                    return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)
            except:
                data = {"flag": 0, "Message": "Not a salesperson Instance"}
                return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)
        except:
            data = {"flag": 0, "Message": "Not a User Instance"}
            return JsonResponse(data, status=status.HTTP_400_BAD_REQUEST)


class GetCoordinates(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit,)

    def post(self, request):

        m = Manager.objects.get(user_ref=request.user)

        s = Salesperson.objects.filter(Managed_By=m)
        SalesPerson = []
        for x in s:
            if x.isLoggedin == True:
                d_Salesperson = {
                    "id": x.User_ref.username,
                    "Lat": x.last_location_lat,
                    "Long": x.last_location_long,
                }
                SalesPerson.append(d_Salesperson)
                d_Salesperson = {}
        response = {"Coordinates": SalesPerson}

        return JsonResponse(response, status=status.HTTP_200_OK)


class SalespersonData(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit,)
    serializer_class = SalespersonSerializer
    queryset = Salesperson.objects.all()


# Virang


class DailyTargetView(viewsets.ModelViewSet):
    queryset = DailyTarget.objects.all()
    serializer_class = DailyTargetSerializer
    permission_classes = [pm.IsAuthenticated, pm.IsAdminUser]


"""class TargetsCompletedView(viewsets.ModelViewSet):
    queryset=TargetsCompleted.objects.all()
    serializer_class=TargetsCompletedSerializer
    permission_classes=[
        pm.IsAuthenticated,
        pm.IsAdminUser
    ]"""


class BillView(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    permission_classes = [pm.IsAuthenticated, pm.IsAdminUser]


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = warehouse.objects.all()
    serializer_class = WarehouseSerializer
    permission_classes = (Permit,)
    authentication_classes = (TokenAuthentication,)


class InventoryList(generics.ListAPIView):
    serializer_class = InventorySerializer
    permission_classes = (Permit,)

    def get_queryset(self):
        queryset = Inventory.objects.all()
        return queryset


class AddToInventory(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit,)

    def post(self, request, pk):
        for i, j in request.data.items():
            i = int(i)
            j = int(j)
            data = {"Salesperson_Ref": pk, "item_Ref": i, "Quantity": j}
            serializer = InventorySerializer(data=data)
            item = warehouse.objects.get(pk=i)
            if serializer.is_valid():
                serializer.save()
                item.Quantity = item.Quantity - j
                item.save()

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        message = "Items added to Salesperson Inventory."
        return Response({"message": message})
