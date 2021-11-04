# Generated by Django 3.2.7 on 2021-11-04 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0007_auto_20211103_2126'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ip_location',
            name='city',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='ip_location',
            name='continent_name',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='ip_location',
            name='country_name',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='ip_location',
            name='region_name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='ip_location',
            name='zip',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
