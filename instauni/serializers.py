from rest_framework import serializers
from instauni.models import *
from accounts.serializers import UserSerializer

# this is where we serialize our models


# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = "__all__"  # or user the names of the model's attribute using a tuple

class TaskSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Task
        # use the UserSerializer class later 
        fields = ('item', 'quantity', 'price_offer', 'action', 'user', 'get_existence_duration')


class AcceptedTaskListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = AcceptedTaskList
        fields = ('tasks', 'user')

