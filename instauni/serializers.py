from rest_framework import serializers
from instauni.models import *
from accounts.serializers import UserSerializer

# this is where we serialize our models


class TaskSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Task
        # use the UserSerializer class later 
        fields = '__all__'


class AcceptedTaskListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AcceptedTaskList
        fields = ('tasks', 'user')


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'