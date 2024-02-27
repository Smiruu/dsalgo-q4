from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ResetPasswordSerializer, UserSerializer, MyTokenObtainPairSerializer, UserSerializerWithToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
import random
from django.core.mail import send_mail
from django.conf import settings
from .models import OTP
from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.forms import SetPasswordForm
from django.http import JsonResponse



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        # Generate OTP
        otp_code = ''.join(random.choices('0123456789', k=6))

        user = User.objects.create(
            username=data.get('username'),
            email=data.get('email'),
            password=make_password(data.get('password')),
            is_active=False
        )

        # Save the OTP code to the database
        OTP.objects.create(user=user, otp=otp_code)

        # Send the OTP to the user via email
        send_mail(
            'Your OTP for registration',
            f'Your OTP for registration is: {otp_code}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def verifyOTP(request):
    data = request.data
    otp_entered = data.get('otp')

    print("Received OTP verification request:", otp_entered)  # Debug statement

    try:
        otp_instance = OTP.objects.get(otp=otp_entered)
    except OTP.DoesNotExist:
        print("Invalid OTP")  # Debug statement
        return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

    # Mark user as active
    otp_instance.user.is_active = True
    otp_instance.user.save()

    # You can optionally login the user automatically after OTP verification
    username = otp_instance.user.username
    password = 'password_used_at_registration'
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)

    print("OTP verified successfully and user activated")  # Debug statement

    return Response({'detail': 'OTP verified successfully and user activated'})

@api_view(['POST'])
def send_reset_password_email(request):
    email = request.data.get('email')
    if email:
        try:
            user = User.objects.get(email=email)
            # Generate reset link
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = request.build_absolute_uri(reverse('reset_password', kwargs={'uidb64': uidb64, 'token': token}))
            message = f'Please follow this link to reset your password: {reset_link}'
            mail_subject = 'Reset your password'
            email = EmailMessage(mail_subject, message, to=[email])
            email.send()
            return JsonResponse({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({'error': 'No user found with this email address.'}, status=status.HTTP_404_NOT_FOUND)
    return JsonResponse({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def reset_password(request, uidb64, token):
    # Decode the user ID and token
    try:
        uid = force_bytes(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    # If user exists and token is valid, reset password
    if user is not None and default_token_generator.check_token(user, token):
        # Deserialize request data
        serializer = ResetPasswordSerializer(data=request.data)

        # Validate serializer data
        if serializer.is_valid():
            # Get validated data
            password1 = serializer.validated_data['password1']
            password2 = serializer.validated_data['password2']

            # Validate passwords
            if password1 == password2:
                # Set the new password for the user
                user.set_password(password1)
                user.save()
                return Response({'message': 'Password reset successfully.'}, status=status.HTTP_200_OK)
            else:
                # If passwords don't match, return error response
                return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # If serializer validation fails, return error response
            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid reset link or user.'}, status=status.HTTP_400_BAD_REQUEST)
