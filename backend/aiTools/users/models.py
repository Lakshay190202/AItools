from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email,name, password = None, ):
        if not email:
            raise ValueError('User must have an Email address')
        if not name:
            raise ValueError('User must have a name')
        
        user = self.model(
            email = self.normalize_email(email),
            name = name,

        )
        user.set_password(password)
        user.save(using = self._db)
        return user

class CustomUser(AbstractUser):
    email = models.EmailField(unique = True)
    name = models.CharField(max_length=100)

    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


    