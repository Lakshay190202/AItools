from django.shortcuts import render, redirect
from django.urls import reverse
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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
            user = serializer.save()
            email = request.data['email']
            verification_url = request.build_absolute_uri(
                reverse('verify-email') + f'?verifytoken={user.verifytoken}'
            )

            html_message = render_to_string('content/email.html', {'verification_url': verification_url})
            plain_message = strip_tags(html_message)
            subject = 'Welcome to AI Tools'
            from_email = 'lakshay19.code@gmail.com'
            to = email

            msg = EmailMultiAlternatives(
                subject,
                plain_message,
                from_email,
                [to]
            )
            msg.attach_alternative(html_message, "text/html")
            msg.send()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'status': 'Bad Request',
                'message': 'Account could not be created with received data.'
                }, status=status.HTTP_400_BAD_REQUEST)
        
class EmailVerificationView(APIView):
    permission_classes= [AllowAny]

    def get(self, request):
        verifytoken = request.query_params.get('verifytoken')
        if CustomUser.objects.filter(verifytoken=verifytoken).exists():
            user = CustomUser.objects.get(verifytoken=verifytoken)
            user.verified = True
            user.verifytoken = None
            user.save()
            return Response({
                'status': 'OK',
                'message': 'Email verified successfully.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'Bad Request',
                'message': 'Invalid token, Try again later'
            }, status=status.HTTP_400_BAD_REQUEST)