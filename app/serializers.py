from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import Accountant, Payer

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email']

class PayerSerializer(ModelSerializer):
    class Meta:
        model = Payer
        exlude = ['id']
    
class AccountantSerializer(ModelSerializer):
    class Meta:
        model = Accountant
        exclude = ['id']