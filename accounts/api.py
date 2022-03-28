from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import datetime, jwt
from knox.models import AuthToken
from django.contrib.auth.models import User
from accounts.serializers import *


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
        
        user = User.objects.get(pk=payload.get("id"))

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
        user_token = AuthToken.objects.create(user)
        token = {
            'auth_token': user_token[1],
            'expiry': user_token[0].expiry
        }
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': token['auth_token']
        })


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



