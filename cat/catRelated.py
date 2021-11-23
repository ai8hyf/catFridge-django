from django.http import HttpResponse, JsonResponse 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils import tree
from .models import User_Extra, Subscription, Notification, Cat_Love, Cat
from .serializers import *
from datetime import datetime, timedelta
from .notifications import *

@login_required(login_url='/cat/login')
def getAllCatFromUser(request):
    if request.is_ajax():
        catOwner = User.objects.get(id = request.POST['userID'])
        catQuerySet = Cat.objects.all().filter(owner = catOwner)
        serializer = CatDetailSerializer(catQuerySet, many=True)
        return JsonResponse(serializer.data, safe=False)

@login_required(login_url='/cat/login')
def addCat(request):
    if request.method == "POST" and request.is_ajax():

        newCat = Cat(
            **request.POST.dict(), 
            owner = User.objects.get(id = request.user.id)
        )
        newCat.save()
        
        return HttpResponse("Success")

@login_required(login_url='/cat/login')
def updateCatDesc(request):

    if request.method == "POST" and request.is_ajax():

        catID = request.POST['catID']
        catDesc = request.POST['catDesc']

        if Cat.objects.filter(id = catID).count() == 1:
            targetCat = Cat.objects.get(id = catID)

            if targetCat.owner == User.objects.get(id = request.user.id) and len(catDesc.strip()) < 200:
                targetCat.catDesc = catDesc
                targetCat.save(update_fields=['catDesc'])

                return HttpResponse("1") # success
        else:
            return HttpResponse("2") # cat does not exist
    
    return HttpResponse("3") # other issues

@login_required(login_url='/cat/login')
def sendLoveToCat(request):

    if request.is_ajax() and request.method == "POST":

        targetCat = Cat.objects.get(id=int(request.POST['target_cat_id']))
        loveSender = User.objects.get(id=int(request.POST['sender_uid']))

        if Cat_Love.objects.filter(target_cat = targetCat, love_sender = loveSender, loved_at__gte=datetime.now()-timedelta(days=7)).exists():
            
            latestLove = Cat_Love.objects.filter(target_cat = targetCat, love_sender = loveSender).latest("loved_at")

            # return HttpResponse("0") # failed to send love at this time

            return HttpResponse(str(latestLove.loved_at.timestamp()))
        
        else:

            newLove = Cat_Love(target_cat = targetCat, love_sender = loveSender)
            newLove.save()

            newNotification = Notification(
                receiver = targetCat.owner,
                type = 1,
                reference_id = newLove.id
            )
            newNotification.save()

            return HttpResponse("1")

@login_required(login_url='/cat/login')
def checkLove(request):

    if request.is_ajax() and request.method == "POST":

        targetUser = User.objects.get(id=int(request.POST['target_user_id']))
        targetCats = Cat.objects.filter(owner = targetUser)

        loveSender = User.objects.get(id=int(request.POST['sender_uid']))

        if Cat_Love.objects.filter(target_cat__in = targetCats, love_sender = loveSender, loved_at__gte=datetime.now()-timedelta(days=7)).exists():
            
            latestLove = Cat_Love.objects.filter(target_cat__in = targetCats, love_sender = loveSender, loved_at__gte=datetime.now()-timedelta(days=7))

            catIds = LoveCheckSerializer(latestLove, many=True)

            return JsonResponse(catIds.data, safe=False)

    return HttpResponse("0")