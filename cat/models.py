from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class IP_Location(models.Model):
    ip = models.GenericIPAddressField(primary_key=True)
    type = models.CharField(default="ipv4", max_length=4)
    continent_name= models.CharField(max_length=20, null=True)
    country_name = models.CharField(max_length=30, null=True)
    region_name = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50, null=True)
    zip = models.CharField(max_length=10, null=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

class User_Extra(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='User_Extra_FK', primary_key=True)
    about = models.CharField(max_length=200, blank=True, null=True)
    birthdate = models.DateField(blank=True)
    header = models.FileField(upload_to="cat/headers/")

    def __str__(self):
        return str(self.user.id)+" "+self.user.username

class Cat(models.Model):    
    owner =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownerFK')
    
    # this might not be the best practice. There should be a table for managing borrows.
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrowerFK', null=True)

    catName = models.CharField(max_length=20, null=True)
    catDesc = models.CharField(max_length=200, null=True)

    catHealth = models.IntegerField(default=50)
    catHappiness = models.IntegerField(default=50)
    catWeight = models.IntegerField(default=50)

    catAge = models.IntegerField(default=0)

    adoptDate = models.DateTimeField(default=now, editable=False)

    head_width = models.IntegerField(null=True)
    head_height = models.IntegerField(null=True)
    head_arc = models.FloatField(default=0.5)
    ear_width = models.FloatField(default=0.5)
    ear_height = models.IntegerField(null=True)
    ear_direction = models.FloatField(default=0.5)
    ear_offset = models.FloatField(default=0.5)
    eye_height = models.FloatField(default=0.5)
    eye_width = models.FloatField(default=0.5)
    eye_distance = models.FloatField(default=0.5)
    eye_margin_top = models.FloatField(default=0.5)
    retina_width = models.FloatField(default=0.5)
    retina_height = models.FloatField(default=0.5)
    neck_length = models.FloatField(default=0.5)
    neck_width = models.FloatField(default=0.5)
    body_height = models.IntegerField(null=True)
    body_width = models.IntegerField(null=True)
    body_arc = models.FloatField(default=0.5)
    tail_height = models.IntegerField(null=True)
    tail_width = models.IntegerField(null=True)
    tail_stroke = models.IntegerField(null=True)
    ear_color = models.CharField(max_length=20, null=True)
    head_color = models.CharField(max_length=20, null=True)
    eye_color = models.CharField(max_length=20, null=True)
    retina_color = models.CharField(max_length=20, null=True)
    neck_color = models.CharField(max_length=20, null=True)
    body_color = models.CharField(max_length=20, null=True)
    tail_color = models.CharField(max_length=20, null=True)
    
    def __str__(self):
        return str(self.id) + " " + self.catName