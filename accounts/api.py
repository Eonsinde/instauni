from rest_framework import generics, permissions, status    
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime, jwt
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


class UserListAPI(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return CustomUser.objects.all()

class UserAPI(generics.RetrieveAPIView):
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    serializer_class = UserSerializer

    def get_object(self):
        auth_token = self.request.COOKIES.get('jwt')
        if not auth_token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(auth_token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        user = CustomUser.objects.get(pk=payload.get("id"))

        # return Response(
        #     UserSerializer(user).data
        # )
        return self.request.user


class RegisterAPI(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(data={"message": "success"}, status=status.HTTP_201_CREATED)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        auth_token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()
        response.set_cookie(key='jwt', value=auth_token, httponly=True)
        response.data = {
            'user':  UserSerializer(user, context=self.get_serializer_context()).data
        }
 
        return response



