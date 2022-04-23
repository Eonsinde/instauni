from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.


def handle_prof_img_upload(instance, filename):
    return '/'.join(['profile_images', str(instance), filename])


class CustomAccountManager(BaseUserManager):
    def create_superuser(self, email, user_name, first_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, first_name, password, **other_fields)

    def create_user(self, email, user_name, first_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                          first_name=first_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    GENDERS = (
        ('m', "Male"),
        ('f', "Female")
    )

    reg_no = models.CharField(max_length=7, unique=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_('Email Address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    
    image = models.ImageField(upload_to=handle_prof_img_upload, null=True, blank=True)
    level = models.CharField(_("Level"), max_length=3, help_text="Format:- 200", default='')
    gender = models.CharField(_("Sex/Gender"), max_length=1, choices=GENDERS, default='m')
    
    hasWallet = models.BooleanField(default=False)
    isVerified = models.BooleanField(default=False)

    date_of_birth = models.DateField(_("Date of Birth"), max_length=150, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
   
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['reg_no', 'user_name', 'email', 'first_name', 'last_name']

    def __str__(self):
        return self.user_name

    @property
    def isProfileCompleted(self):
        """ Check all fields that needs be filled and ensure they are """
        return False

    @property
    def get_fullname(self):
        return f'{self.user.first_name} {self.user.last_name}'

