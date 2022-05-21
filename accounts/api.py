from rest_framework import generics, permissions, status    
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import CustomUser
from accounts.serializers import *



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(data={"message": "success"}, status=status.HTTP_201_CREATED)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    lookup_fields = 'id'


class UpdateUserAPI(generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated 
    ]

    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    lookup_fields = 'id'


class DeleteUserAPI(generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated 
    ]

    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    lookup_fields = 'id'





