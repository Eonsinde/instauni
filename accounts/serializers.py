from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import authenticate
from accounts.models import *


# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'reg_no', 'username', 'password', 'email', 'first_name', 'last_name', 'image', 
                'level', 'gender', 'hasWallet', 'isVerified', 'date_of_birth', 'date_joined']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True}}

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(username, email, password, **validated_data)
        # user.is_staff = True

        # to create the wish list for the user
        return user

    # override method for updating and deleting users


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('id', 'reg_no', 'username', 'email', 'password', 'level', 'gender')
        # so u can't view the password on request through viewsets
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'], **validated_data)
        
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

