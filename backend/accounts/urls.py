from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', get_user, name='profile'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('register/', registerUser, name='register'),
    path('verify-otp/', verifyOTP, name='verify_otp'),
    path('send-reset-password-email/', send_reset_password_email, name='send_reset_password_email'),
     path('reset-password/<uidb64>/<token>/', reset_password, name='reset_password'),
]