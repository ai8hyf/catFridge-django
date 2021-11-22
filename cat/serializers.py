from django.db.models import fields
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class CatIdSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Cat
        fields = ['id', 'catName']

# get username and id
class IPLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = IP_Location
        fields = ['ip', 'country_name', 'region_name', 'city']

# get username and id
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class LoveCheckSerializer(serializers.ModelSerializer):

    target_cat = CatIdSerializer(read_only = True)

    class Meta:
        model = Cat_Love
        fields = ['target_cat']

class CatLoveNotificationSerializer(serializers.ModelSerializer):

    target_cat = CatIdSerializer(read_only = True)
    love_sender = UserSerializer(read_only = True)

    class Meta:
        model = Cat_Love
        fields = ['target_cat','love_sender', 'loved_at']

# get username and id
class UserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id']

class FollowingIdSerializer(serializers.ModelSerializer):

    target = UserIdSerializer(read_only = True)

    class Meta:
        model = Subscription
        fields = ['target']

class SubNotificationSerializer(serializers.ModelSerializer):

    followed_by = UserSerializer(read_only = True)

    class Meta:
        model = Subscription
        fields = ['id','followed_by', "followed_at"]

# get extra user info
class UserExtraSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)

    class Meta:
        model = User_Extra
        fields = ['user', 'about', 'birthdate', 'header']

# get all cat info
class CatDetailSerializer(serializers.ModelSerializer):    
    owner = UserSerializer(read_only = True)
    borrower = UserSerializer(read_only = True)
    
    class Meta:
        model = Cat
        # fields = ['id','owner', 'borrower', 'catName', 'catDesc', 'catHealth', 'catHappiness', 'catWeight', 'catAge', 'headSize', 'neckLength', 'neckWidth', 'bodyHeight', 'bodyWidth', 'tailLength', 'faceColor', 'bodyColor', 'tailColor', 'headGlowColor', 'bodyTLRadius', 'bodyTRRadius', 'bodyBLRadius', 'bodyBRRadius', 'bodyTatoo', 'tatooColor', 'headAlign']
        fields = '__all__'

# get some cat info
class CatSummarySerializer(serializers.ModelSerializer):    
    owner = UserSerializer(read_only = True)
    
    class Meta:
        model = Cat
        fields = ['id','owner', 'catName', 'catDesc', 'catHealth', 'catHappiness', 'catWeight', 'catAge']


