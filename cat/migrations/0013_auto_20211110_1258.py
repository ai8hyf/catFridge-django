# Generated by Django 3.2.7 on 2021-11-10 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0012_auto_20211110_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='catAge',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='cat',
            name='catHappiness',
            field=models.IntegerField(default=50),
        ),
        migrations.AlterField(
            model_name='cat',
            name='catHealth',
            field=models.IntegerField(default=50),
        ),
        migrations.AlterField(
            model_name='cat',
            name='catWeight',
            field=models.IntegerField(default=50),
        ),
    ]