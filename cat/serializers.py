from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

# get username and id
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

# get all cat info
class CatDetailSerializer(serializers.ModelSerializer):    
    owner = UserSerializer(read_only = True)
    borrower = UserSerializer(read_only = True)
    
    class Meta:
        model = Cat
        fields = ['owner', 'borrower', 'catName', 'catDesc', 'catHealth', 'catHappiness', 'catWeight', 'catAge', 'headSize', 'neckLength', 'neckWidth', 'bodyHeight', 'bodyWidth', 'tailLength', 'faceColor', 'bodyColor', 'tailColor', 'headGlowColor', 'bodyTLRadius', 'bodyTRRadius', 'bodyBLRadius', 'bodyBRRadius', 'bodyTatoo', 'tatooColor', 'headAlign']

# get some cat info
class CatSummarySerializer(serializers.ModelSerializer):    
    owner = UserSerializer(read_only = True)
    
    class Meta:
        model = Cat
        fields = ['owner', 'catName', 'catDesc', 'catHealth', 'catHappiness', 'catWeight', 'catAge']