from rest_framework import serializers
from accounts.models import *


# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'reg_no', 'username', 'password', 'email', 'first_name', 'last_name', 'image', 'level', 
                'gender', 'hasWallet', 'isVerified', 'date_of_birth', 'date_joined', 'get_fullname', 'get_gender', 'is_profile_completed']
        extra_kwargs = {'id': {'read_only': True}, 'password': {'write_only': True}}


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'reg_no', 'username', 'email', 'password', 'level', 'gender')
        # so u can't view the password on request through viewsets
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # print("Validated Data:", validated_data)
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(username, email, password, **validated_data)
        return user

