from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.api import *


urlpatterns = [
    path('api/auth/user/<int:pk>/', UserAPI.as_view()),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]



