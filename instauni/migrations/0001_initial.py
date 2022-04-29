# Generated by Django 4.0.3 on 2022-04-21 09:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipient_name', models.CharField(help_text='Person to deliver task to', max_length=100)),
                ('detail', models.CharField(help_text='Details on task to be performed', max_length=500)),
                ('delivery_location', models.CharField(help_text='Where to deliver to', max_length=300)),
                ('item_location', models.CharField(help_text="item's location is needed", max_length=100)),
                ('price_offer', models.FloatField(help_text='Item Price')),
                ('status', models.CharField(choices=[('p', 'pending'), ('c', 'completed'), ('a', 'accepted')], default='p', help_text='Set the status of Task: Pending/Completed/Accepted', max_length=1)),
                ('date_created', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Task Creator')),
            ],
            options={
                'ordering': ['-date_created'],
            },
        ),
        migrations.CreateModel(
            name='AcceptedTaskList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tasks', models.ManyToManyField(to='instauni.task')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
