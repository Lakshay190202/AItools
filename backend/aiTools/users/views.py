from django.shortcuts import render
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets, generics, status
from django.contrib.auth.hashers import make_password, check_password

class SignupView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def encry_password(self, password):
        password = self.request.data('password')
        encrypted_password = make_password(password)
        return encrypted_password