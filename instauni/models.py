from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.


class Task(models.Model):
    STATUSES = (
        ('p', 'pending'),
        ('c', 'completed'),
        ('a', 'accepted'),
    )

    recipient_name = models.CharField(max_length=100, help_text="Person to deliver task to")
    detail = models.CharField(max_length=500, help_text="Details on task to be performed")
    delivery_location = models.CharField(max_length=100, help_text='Where to deliver to')
    item_location = models.CharField(max_length=100, help_text="item's location is needed")
    price_offer = models.FloatField(help_text="Item Price")
    status = models.CharField(max_length=1, choices=STATUSES, default='p', help_text="Set the status of Task: Pending/Completed/Accepted")
    # cascade means, if u delete the ref user then, the task should also be deleted
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="Task Creator", on_delete=models.CASCADE, null=True)
    # When a user accepts a task, the user is bound to the created task as the executioner
    # deliverer = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name="Task Deliverer", on_delete=models.CASCADE, null=True)
    date_created = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f'{self.detail[:15]} - {self.status}'

    @property
    def get_existence_duration(self):
        """ 
            Existence duration if how long the Task existed which is the diff btwn
            The current time and the Time it was created
        """
        existenceDuration = timezone.now() - self.date_created
        return self.convert_to_time_format(existenceDuration.seconds)

    def convert_to_time_format(self, pSeconds):
        """
            Converts timedelta to format: 12hrs:32mins
        """
        hours: int
        minutes: int = int(pSeconds / 60) # convert to mins
        seconds: int = int(pSeconds % 60) # remainder is the seconds left
        
        output: str
        if minutes >= 60: # an hour
            # resolve hours
            hours = minutes / 60 # convert minutes to hrs
            minutes = minutes % 60 # the remainder is the minutes left
            output = f'{int(hours)}Hr(s) {minutes}Min(s) {seconds}Sec(s)'
        elif minutes >= 1: # lesser than an hour but up to a minute
            output = f'{minutes}Min(s) {seconds}Sec(s)'
        else: # not up to a minute
            output = f'{seconds}Sec(s)'

        return output

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_created = timezone.now()
        return super(Task, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-date_created'] # from newest to oldest


class AcceptedTaskList(models.Model):
    # To keep track of all accepted task by a user
    # prevent user from being deleted until is either fulfilled or 
    # accepted task is removed manually
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.RESTRICT)
    tasks = models.ManyToManyField(Task)
    # don't allow users to accept already accepted tasks - block it in the frontend

    def __str__(self):
        return f'{self.user.username} has {self.tasks.Count()}'

    
# implement cronJOB that would prevent the same user from submitting 
# multiple times(use email & full name as safe guards). It should take 
# 12Hrs b4 the user can submit another after initial submission
class Contact(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=80)
    message = models.TextField(max_length=450)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.email} - {self.message[:20]}...'

    class Meta:
        ordering = ['-created_at']


class FAQ(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=450)

    def __str__(self):
        return f'{self.title[:20]}...'

    class Meta:
        ordering = ['-id']