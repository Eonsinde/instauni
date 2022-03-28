from django.db import models
from django.contrib.auth.models import User


# Create your models here.


def handle_prof_img_upload(instance, filename):
    return '/'.join(['profile_images', str(instance), filename])


class Profile(models.Model):
    full_name = models.CharField("Full Name", max_length=300)
    image = models.ImageField(upload_to=handle_prof_img_upload, null=True, blank=True)
    reg_no = models.CharField("Registration Number", max_length=7, help_text="Format:- 1700124")
    level = models.CharField("Level", max_length=3, help_text="Format:- 200")
    # cascade means, if u delete the ref user then, their profile should also be deleted
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username}\'s  Profile'
