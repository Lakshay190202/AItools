from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email,name, password = None,verified = False, username = None,verifytoken = None):
        if not email:
            raise ValueError('User must have an Email address')
        if not name:
            raise ValueError('User must have a name')
        
        user = self.model(
            email = self.normalize_email(email),
            name = name,
            verfytoken = verifytoken,

        )
        user.set_password(password)
        user.save(using = self._db)
        return user

class CustomUser(AbstractUser):
    email = models.EmailField(unique = True)
    name = models.CharField(max_length=100)
    verified = models.BooleanField(default=False)
    username = models.CharField(max_length=100, unique=True)
    verifytoken = models.CharField(max_length=100, blank=True, null=True)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


    