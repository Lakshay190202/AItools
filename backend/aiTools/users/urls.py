from django.urls import path
from .views import SignupView, EmailVerificationView

urlpatterns = [
    path('signup', SignupView.as_view(), name='signup'),
    path('verify-email', EmailVerificationView.as_view(), name='verify-email'),


]