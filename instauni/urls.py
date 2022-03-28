from rest_framework import routers
from instauni.api import *

# this is where our routes are defined 

router = routers.DefaultRouter()
router.register('tasks', TaskViewSets, 'tasks')

urlpatterns = router.urls