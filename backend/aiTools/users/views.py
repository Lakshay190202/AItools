from django.shortcuts import render
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if CustomUser.objects.filter(email=request.data['email']).exists():
            return Response({
                'status': 'Bad Request',
                'message': 'User with this email already exists.'
            }, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'status': 'Bad Request',
                'message': 'Account could not be created with received data.'
                }, status=status.HTTP_400_BAD_REQUEST)