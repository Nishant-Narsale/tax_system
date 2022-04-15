from unicodedata import name
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import Payer, Accountant

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response({"authenticated":True})

@api_view(["POST"])
def register(request):
    obj = {
        'response' :'user created',
        'username' : request.data['username'],
        'password' : request.data['password'],
        'type': request.data['type']
        }
    if User.objects.filter(username = request.data['username']).exists():
        return Response({'response' :'username already exist'}, status=409)
    user = User.objects.create_user(username = request.data['username'], password = request.data['password'], first_name=request.data['first_name'], last_name=request.data['last_name'])
    user.save()
    if request.data['type'] == 'payer':
        Payer.objects.create(user=user, name=request.data['first_name'])
    elif request.data['type'] == 'accountant':
        Accountant.objects.create(user=user)

    return Response(obj, status=200)

@api_view(["GET","PUT"])
@permission_classes([IsAuthenticated])
def list_taxpayers(request):
    if request.user.is_staff or request.user.is_superuser:

        if request.method == "GET":
            users = User.objects.filter(is_staff=False)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)

        elif request.method == "PUT":
            print(request.data)
            try:
                user = User.objects.get(username=request.data['username'])
            except:
                return Response({"Invalid username"})
            serializer = UserSerializer(user, data=request.data)

            if not serializer.is_valid():
                return Response({'Invalid Data'})

            serializer.save()
            return Response(serializer.data)

    else:
        return Response({"taxpayers list is only available to admin and tax accountants"})