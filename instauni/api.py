from rest_framework import viewsets, permissions
from instauni.serializers import TaskSerializer
from instauni.models import Task

# this is where we write our view sets that will determine what is returned to a user


class TaskViewSets(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.all()
        # return self.request.user.tasks.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class AcceptedTaskList



