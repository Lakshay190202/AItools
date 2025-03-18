from .models import CustomUser
from rest_framework import serializers
import uuid

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'password', 'verifytoken']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            email = validated_data.get('email'),
            name = validated_data.get('name'),
            username = validated_data.get('email'),  # Use email as username
            verifytoken = str(uuid.uuid4())
            )
        
        user.set_password(validated_data.get('password'))
        user.save()
        return user

