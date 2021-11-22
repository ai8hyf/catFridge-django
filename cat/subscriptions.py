from django.http import HttpResponse, JsonResponse 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import User_Extra, Subscription, Notification
from .serializers import *
from datetime import datetime
from .notifications import *

@login_required(login_url='/cat/login')
def subscribe(request):

    if request.is_ajax() and request.method == "POST":
        target_id = request.POST['target_id']

        if User.objects.filter(id = target_id).exists() == False:
            return HttpResponse("User does not exist!")

        target = User.objects.get(id = target_id)
        followed_by = request.user

        new_subscription, created = Subscription.objects.get_or_create(target=target, followed_by=followed_by, defaults={
            "target":target, 
            "followed_by":followed_by,
        })

        if created == True:
            print("record id")
            print(new_subscription.id)

            newNotification = Notification(
                receiver = target,
                type = 0,
                reference_id = new_subscription.id
            )
            newNotification.save()

            return HttpResponse("success")
        else:
            return HttpResponse("Already followed")

@login_required(login_url='/cat/login')
def unsubscribe(request):

    if request.is_ajax() and request.method == "POST":
        target_id = request.POST['target_id']

        if User.objects.filter(id = target_id).exists() == False:
            return HttpResponse("User does not exist!")

        target = User.objects.get(id = target_id)
        followed_by = request.user

        if Subscription.objects.filter(target=target, followed_by=followed_by).exists():
            target_relation = Subscription.objects.get(target=target, followed_by=followed_by)

            reference_id = target_relation.id

            if Notification.objects.filter(reference_id = reference_id, type = 0).exists():
                related_notification = Notification.objects.get(reference_id = reference_id, type = 0)
                related_notification.delete()

            target_relation.delete()

            return HttpResponse("success")
        else:
            return HttpResponse("You are not following the user.")
        

@login_required(login_url='/cat/login')
def checkSubscription(request):

    if request.is_ajax() and request.method == "POST":
        target_id = request.POST['target_id']
        target = User.objects.get(id = target_id)
        followed_by = request.user

        if Subscription.objects.filter(target=target, followed_by=followed_by).exists():
            return HttpResponse(1)
        else:
            return HttpResponse(0)

@login_required(login_url='/cat/login')
def getFollowingIds(request):

    if request.is_ajax() and request.method == "POST":
        target_id = request.POST.getlist('target_ids[]')

        print(target_id)

        target = User.objects.filter(id__in = target_id)

        print(target)

        followed_by = request.user

        QuerySet = Subscription.objects.filter(target__in=target, followed_by=followed_by)

        res = FollowingIdSerializer(QuerySet, many=True)

        return JsonResponse(res.data, safe=False)

@login_required(login_url='/cat/login')
def getFollowerByName(request):
    if request.is_ajax() and request.method == "POST":
        targetUser = User.objects.get(username = request.POST["username"])
        allFollower = Subscription.objects.filter(target=targetUser).values_list("followed_by")

        QuerySet = User_Extra.objects.filter(user__in = allFollower)
        extraUser = UserExtraSerializer(QuerySet, many = True)

        return JsonResponse(extraUser.data, safe=False)

@login_required(login_url='/cat/login')
def getFollowingByName(request):
    if request.is_ajax() and request.method == "POST":
        targetUser = User.objects.get(username = request.POST["username"])
        allFollowing = Subscription.objects.filter(followed_by=targetUser).values_list("target")

        QuerySet = User_Extra.objects.filter(user__in = allFollowing)
        extraUser = UserExtraSerializer(QuerySet, many = True)

        return JsonResponse(extraUser.data, safe=False)