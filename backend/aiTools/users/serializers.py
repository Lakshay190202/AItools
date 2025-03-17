from .models import CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            email = validated_data.get('email'),
            name = validated_data.get('name'),
        )
        user.set_password(validated_data.get('password'))
        user.save()
        return user

