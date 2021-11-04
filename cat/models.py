from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage

fs = FileSystemStorage(location='/media/photos')

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
    header = models.ImageField(storage=fs)

    def __str__(self):
        return str(self.user.id)+" "+self.user.username

class Cat(models.Model):    
    owner =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='ownerFK')
    
    # this might not be the best practice. There should be a table for managing borrows.
    borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrowerFK', null=True)

    catName = models.CharField(max_length=20)
    catDesc = models.CharField(max_length=200)

    catHealth = models.IntegerField()
    catHappiness = models.IntegerField()
    catWeight = models.IntegerField()

    catAge = models.IntegerField()

    # # still thinking about this one.
    # adoptDate = models.DateTimeField()

    headSize = models.IntegerField()
    neckLength = models.IntegerField()
    neckWidth = models.IntegerField()
    bodyHeight = models.IntegerField()
    bodyWidth = models.IntegerField()
    tailLength = models.IntegerField()
    faceColor = models.CharField(max_length=7)
    bodyColor = models.CharField(max_length=7)
    tailColor = models.CharField(max_length=7)
    headGlowColor = models.CharField(max_length=7)
    bodyTLRadius = models.CharField(max_length=6)
    bodyTRRadius = models.CharField(max_length=6)
    bodyBLRadius = models.CharField(max_length=6)
    bodyBRRadius = models.CharField(max_length=6)
    bodyTatoo = models.CharField(max_length=7)
    tatooColor = models.CharField(max_length=7)
    headAlign = models.CharField(max_length=6)

    def __str__(self):
        return str(self.id) + " " + self.catName
