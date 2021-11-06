# Generated by Django 3.2.7 on 2021-11-04 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cat', '0005_user_extra'),
    ]

    operations = [
        migrations.CreateModel(
            name='IP_Location',
            fields=[
                ('ip', models.GenericIPAddressField(primary_key=True, serialize=False)),
                ('type', models.CharField(default='ipv4', max_length=4)),
                ('continent_name', models.CharField(max_length=20)),
                ('country_name', models.CharField(max_length=30)),
                ('region_name', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('zip', models.CharField(max_length=10)),
            ],
        ),
        migrations.AlterField(
            model_name='user_extra',
            name='about',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]