# Generated by Django 4.0.3 on 2022-04-23 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_customuser_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='date_of_birth',
            field=models.DateField(blank=True, max_length=150, null=True, verbose_name='Date of Birth'),
        ),
    ]