# Generated by Django 3.2.7 on 2021-10-14 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.CharField(max_length=150)),
                ('borrower', models.CharField(max_length=150)),
                ('catName', models.CharField(max_length=20)),
                ('catDesc', models.CharField(max_length=200)),
                ('catHealth', models.IntegerField()),
                ('catHappiness', models.IntegerField()),
                ('catWeight', models.IntegerField()),
                ('catAge', models.IntegerField()),
                ('headSize', models.IntegerField()),
                ('neckLength', models.IntegerField()),
                ('neckWidth', models.IntegerField()),
                ('bodyHeight', models.IntegerField()),
                ('bodyWidth', models.IntegerField()),
                ('tailLength', models.IntegerField()),
                ('faceColor', models.CharField(max_length=7)),
                ('bodyColor', models.CharField(max_length=7)),
                ('tailColor', models.CharField(max_length=7)),
                ('headGlowColor', models.CharField(max_length=7)),
                ('bodyTLRadius', models.CharField(max_length=6)),
                ('bodyTRRadius', models.CharField(max_length=6)),
                ('bodyBLRadius', models.CharField(max_length=6)),
                ('bodyBRRadius', models.CharField(max_length=6)),
                ('bodyTatoo', models.CharField(max_length=7)),
                ('tatooColor', models.CharField(max_length=7)),
                ('headAlign', models.CharField(max_length=6)),
            ],
        ),
    ]
