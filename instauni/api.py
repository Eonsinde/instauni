from rest_framework import viewsets, generics, permissions
from instauni.serializers import *
from instauni.models import Task

# this is where we write our view sets that will determine what is returned to a user


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        # permissions.IsAuthenticated,
    ]

    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.all()
        # return self.request.user.tasks.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class AcceptedTaskList

class ContactAPI(generics.CreateAPIView):
    serializer_class = ContactSerializer


class FAQAPI(generics.ListAPIView):
    serializer_class = FAQSerializer

    def get_queryset(self):
        return FAQ.objects.all()
