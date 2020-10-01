from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, action
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
import json
from django.http import JsonResponse, HttpResponse
from rest_framework import generics, status, viewsets, permissions
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
from .permissions import *
from .serializers import *
import pandas as pd
from rest_framework.authtoken.views import APIView
from rest_framework.response import Response

# Virang ke imports
from rest_framework import viewsets
from rest_framework import response

from .models import DailyTarget, Bill
from rest_framework import permissions as pm


##
from .models import *
from .permissions import IsOwnerOrReadOnly
from .serializers import *
from rest_framework.views import APIView


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
                    "Photo": str(x.Photo.url),
                    "Lat": x.last_location_lat,
                    "Long": x.last_location_long,
                }
                SalesPerson.append(d_Salesperson)
                d_Salesperson = {}
            response = {
                "Token": token.key,
                "Flag": 1,
                "Name": m.Name,
                "Photo": str(m.Photo.url),
                "SalesPerson": SalesPerson,
            }
            k = m.Photo.url
            print(k)

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
                "Photo": str(s.Photo.url),
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
                print(x)
                d_Salesperson = {
                    "id": x.User_ref.username,
                    "Lat": x.last_location_lat,
                    "Long": x.last_location_long,
                }
                SalesPerson.append(d_Salesperson)
                d_Salesperson = {}
        print(SalesPerson)
        response = {"Coordinates": SalesPerson}

        return JsonResponse(response, status=status.HTTP_200_OK)


class SalespersonData(generics.ListAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit,)
    serializer_class = SalespersonSerializer
    queryset = Salesperson.objects.all()


class UpdateCoordinates(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (Permit2,)

    def post(self, request):
        lat = request.POST["latitude"]
        long = request.POST["longitude"]
        s = Salesperson.objects.get(User_ref=request.user)
        s.last_location_lat = lat
        s.last_location_long = long
        s.save()
        return JsonResponse("Updated", status=status.HTTP_200_OK, safe=False)


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


# AliAbbas
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
            item = Warehouse.objects.get(pk=i)
            if serializer.is_valid():
                serializer.save()
                item.Quantity = item.Quantity - j
                item.save()
                m = Manager.objects.get(user_ref=request.user)
                date = datetime.date.today()
                time = datetime.datetime.now().time()
                data2 = {
                    "Item_Ref": i,
                    "Assigned_By": m.pk,
                    "Assigned_To": pk,
                    "Assign_Date": date,
                    "Assign_Time": time,
                    "assign_quantity": j,
                }
                serializer2 = ItemAssignSerializer(data=data2)
                if serializer2.is_valid():
                    serializer2.save()

            else:
                return JsonResponse(
                    serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )
        message = "Items added to Salesperson Inventory."
        return JsonResponse({"message": message})


class WarehouseView(APIView):
    permission_classes = (Permit,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request, format=None):
        items = Warehouse.objects.all()
        serializer = WarehouseSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):

        item_id = request.data["Company_Item_code"]
        try:
            item = Warehouse.objects.get(pk=item_id)
        except Warehouse.DoesNotExist:
            item = None
        if item:
            item.Quantity += int(request.data["Quantity"])
            item.save()
            data = {
                "Item_Group_Code": item.Item_Group_Code,
                "Company_Item_code": item.Company_Item_code,
                "Company_Code": item.Company_Code,
                "Quantity": item.Quantity,
                "Name": item.Name,
                "Photo": str(request.data["Photo"]),
                "Description": item.Description,
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            serializer = WarehouseSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemAssignView(APIView):
    permission_classes = (Permit,)

    def get(self, request):
        m = Manager.objects.get(user_ref=request.user)
        items = ItemAssign.objects.filter(Assigned_By=m)
        serializer = ItemAssignSerializer(items, many=True)
        return Response(serializer.data)

# Endpoint to Integrate with Frontend Based on QR Scanner


class WarehouseItemEntry(generics.GenericAPIView):
    def post(self, request):
        Item_Group_Code = request.data['Item_Group_Code']
        Company_Item_code = request.data['Company_Item_code']
        Company_Code = request.data['Company_Code']
        Quantity = request.data['Quantity']
        Name = request.data['Name']
        Description = request.data['Description']
        c = Warehouse(Item_Group_Code=Item_Group_Code, Company_Item_code=Company_Item_code,
                      Company_Code=Company_Code, Quantity=Quantity, Name=Name, Description=Description)
        c.save()
        return JsonResponse({"flag": "1"}, status=status.HTTP_201_OK)


# Populate Database----------------------------------------------------------------------------------------------------------
def ManagerPopulate(request):
    df = pd.read_csv("Manager.csv")
    for i in range(len(df)):
        u = User.objects.create_user(username=df.loc[i, "Employee_ID"])
        u.set_password("init@123")
        u.save()
        m = Manager(user_ref=u, Name=df.loc[i, "Name"], Age=df.loc[i, "Age"])
        m.save()

    return JsonResponse("Done", status=status.HTTP_200_OK, safe=False)


def SalespersonPopulate(request):
    df = pd.read_csv("Salesperson.csv")
    for i in range(len(df)):
        u = User.objects.create_user(
            username=df.loc[i, "Employee_ID"], password="init@123"
        )
        u.save()
        u_ref = User.objects.get(username=df.loc[i, "Managed_By"])
        m = Manager.objects.get(user_ref=u_ref)
        s = Salesperson(
            User_ref=u, Name=df.loc[i,
                                    "Name"], Age=df.loc[i, "Age"], Managed_By=m
        )
        s.save()
    return JsonResponse("Done", status=status.HTTP_200_OK, safe=False)


# Update Warehouse-----------------------------------------------------------------------------------------------------------------------------------


class UpdateWarehouse(generics.GenericAPIView):
    def post(self, request):
        file = request.data["file"]
        print(type(file))


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = Userserializer
    permission_classes = (permissions.IsAdminUser,)
    # authentication_classes = (TokenAuthentication,)


class ManagerViewSet(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer
    permission_classes = (permissions.IsAdminUser,)
    # authentication_classes = (TokenAuthentication,)


class SalespersonViewSet(viewsets.ModelViewSet):
    queryset = Salesperson.objects.all()
    serializer_class = SalespersonSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # authentication_classes = (TokenAuthentication, )


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer
    permission_classes = (Permit,)
    # authentication_classes = (TokenAuthentication, )


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    @action(detail=False)
    def inventory(self, request):
        inv = Inventory.objects.filter(
            user_ref=request.user)  # Android Endpoint
        serializer = self.get_serializer(inv, many=True)
        return Response(serializer.data)

    # authentication_classes = (TokenAuthentication, )
