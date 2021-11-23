from django.http import HttpResponse, JsonResponse 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils import tree
from .models import User_Extra, Subscription, Notification, Cat_Love, Cat
from .serializers import *
from datetime import datetime, timedelta
from .notifications import *
from django.db.models import Q

@login_required(login_url='/cat/login')
def adpotNewCatFeeds(request):

    if request.is_ajax() and request.method == "GET":

        following = Subscription.objects.filter(followed_by = request.user).values_list("target")

        # foundRecord = Cat.objects.filter(owner__in = following or owner = request.user).order_by('-id')

        foundRecord = Cat.objects.filter(Q(owner__in = following) | 
                               Q(owner=request.user)).order_by('-id')

        limit = 20

        if foundRecord.count() > limit:
            foundRecord = foundRecord[:limit]
        
        response = CatSummarySerializer(foundRecord, many=True)

        return JsonResponse(response.data, safe=False)

