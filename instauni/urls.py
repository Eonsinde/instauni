from rest_framework import routers
from instauni.api import *

# this is where our routes are defined 

router = routers.DefaultRouter()
router.register('tasks', TaskViewSet, 'tasks')
# router.register('contact', ContactAPI, 'contact')
# router.register('FAQs', FAQAPI, 'FAQs')

urlpatterns = router.urls