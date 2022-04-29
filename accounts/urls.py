from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.api import *


urlpatterns = [
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/auth/users', UserListAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]



