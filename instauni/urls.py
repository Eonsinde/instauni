from django.urls import path, include
from rest_framework import routers
from instauni.api import *

# this is where our routes are defined 


task_list = TaskViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

task_detail = TaskViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = [
    path('tasks', task_list, name='task-list'),
    path('tasks/<int:pk>/', task_detail, name='task-detail'),
    path('contact', ContactAPI.as_view(), name='contact-create'),
    path('faqs', FAQAPI.as_view(), name='faq-list'),
]
