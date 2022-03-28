from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Task(models.Model):
    ACTIONS = (
        ('b', 'buy'),
        ('s', 'sell')
    )

    item = models.CharField(max_length=300, help_text="Item to Collect/Buy/Get")
    quantity = models.IntegerField(help_text="Item Quantity")
    price_offer = models.FloatField(help_text="Item Price")
    action = models.CharField(max_length=1, choices=ACTIONS)
    # newly added
    room_no = models.CharField("Room No for delivery", max_length=5) 
    detailed_location = models.CharField("Further details", max_length=300)
    action_hint = models.CharField("Further details on action", max_length=300)
    # cascade means, if u delete the ref user then, the task should also be deleted
    user = models.ForeignKey(User, verbose_name="Task Creator", on_delete=models.CASCADE, null=True)
    date_created = models.DateTimeField(auto_now=True)


    def __str__(self) -> str:
        statement: str
        if self.action == 'b': # buy
            statement = "needs"
        else: # sell
            statement = "wants to sell"
        return f'{self.user} {statement} {self.item}'

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