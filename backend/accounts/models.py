from django.utils import timezone
from django.db import models
import secrets
import string

class OTP(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)

    @classmethod
    def generate_otp(cls, user):
        otp = ''.join(secrets.choice(string.digits) for _ in range(6))
        return cls.objects.create(user=user, otp=otp)

    def __str__(self):
        return f"{self.user.username}'s OTP: {self.otp}"