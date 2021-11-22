from typing import DefaultDict
from .models import *
from django.contrib.auth.models import User
from .serializers import *
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.http import HttpResponse, JsonResponse


@login_required(login_url='/cat/login')
def checkNewNotification(request):
    newNotificationCount = Notification.objects.filter(receiver = request.user, resolved = False).count()
    return HttpResponse(newNotificationCount)

@login_required(login_url='/cat/login')
def getNewNotification(request):

    # need to add pagination info in the future

    details = CollectNotification(Notification.objects.filter(receiver = request.user, resolved = False))

    Notification.objects.filter(receiver = request.user, resolved = False).update(resolved = True)

    return JsonResponse(details, safe=False)

@login_required(login_url='/cat/login')
def getAllNotification(request):

    # need to add pagination info in the future

    details = CollectNotification(Notification.objects.filter(receiver = request.user))
    return JsonResponse(details, safe=False)

def CollectNotification(NotificationQueryDict):

    notificationIdList = DefaultDict(list)
    notificationList = {}
    idLookUp = {}

    for n in NotificationQueryDict:
        notificationIdList[n.type].append(n.reference_id)
        idLookUp[str(n.type)+"-"+str(n.reference_id)] = n.id

    notificationList['type_0'] = SubNotificationSerializer(Subscription.objects.filter(id__in = notificationIdList[0]), many=True).data

    notificationList['type_1'] = CatLoveNotificationSerializer(Cat_Love.objects.filter(id__in = notificationIdList[1]), many=True).data

    notificationList['idLookUp'] = idLookUp

    return notificationList


