import os
from django.db.models.query import QuerySet
from django.http import HttpResponse, JsonResponse
from django.core import serializers as sr
from django.http.request import QueryDict
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Cat, User_Extra, IP_Location, Subscription, Borrow_Request
from functools import lru_cache
from .serializers import *
import requests as rq
from ipware import get_client_ip
import base64
from django.core.files.base import ContentFile
from datetime import datetime


def getLocationForIP(incoming_ip):

    # the api call works
    # incoming_ip = "69.174.157.248"

    # if you run it on a local server, the ip will always be 127.0.0.1

    if IP_Location.objects.filter(ip = incoming_ip).exists() == False:
        api_key = "333935a1f64af0aa8dcd64141c375269"
        base_url = "http://api.ipstack.com/"
        ip_stack_request = base_url + incoming_ip + "?access_key=" + api_key

        res = rq.get(ip_stack_request)

        res = res.json()

        new_ip = IP_Location(
            ip = incoming_ip,
            type = res['type'],
            continent_name = res['continent_name'],
            country_name = res['country_name'],
            region_name = res['region_name'],
            city = res['city'],
            zip = str(res['zip']),
            longitude = res['longitude'],
            latitude = res['latitude']
        )

        new_ip.save()

        return new_ip
        
    return IP_Location.objects.get(ip = incoming_ip)


def getExtraUserInfo(user_id):
    currentUser = User.objects.get(id = user_id)
    extraUser, created = User_Extra.objects.get_or_create(user = currentUser, defaults={
        'user': currentUser,
        "about": "Nothing to tell...",
        "birthdate": "1970-01-01",
    })

    extraUser = UserExtraSerializer(extraUser, many = False)

    return extraUser


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

        try:
            target_relation = Subscription.objects.get(target=target, followed_by=followed_by)
            target_relation.delete()
            return HttpResponse("success")
        except:
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

@login_required(login_url='/cat/login')
def uploadHeader(request):
    
    # -----------------------------------------------
    # this does not work on Heroku because I am poor
    # -----------------------------------------------

    if request.is_ajax() and request.method == "POST":

        extraUser = User_Extra.objects.get(user = request.user)

        oldImage = ""
        if bool(extraUser.header) == True:
            oldImage = extraUser.header.path

        imageData = request.POST['new_header']
        format, imgstr = imageData.split(';base64,')
        ext = format.split('/')[-1]

        imageFile = ContentFile(base64.b64decode(imgstr)) 
        fileName = request.user.username + str(datetime.utcnow()) + "." + ext

        extraUser.header.save(fileName, imageFile, save=True)

        # not very elegant.
        if oldImage != "":
            os.remove(oldImage)

        return HttpResponse("1")
    
    return HttpResponse("0")
    


@login_required(login_url='/cat/login')
def index(request):
    context = {'username': request.user.username, 'email': request.user.email}
    return render(request, 'cat/index.html', context)

@login_required(login_url='/cat/login')
def connection(request):
    context = {'username': request.user.username, 'email': request.user.email}
    return render(request, 'cat/connection.html', context)

@login_required(login_url='/cat/login')
def fridge(request):

    context = {'username': request.user.username, 'email': request.user.email}

    if request.method == 'GET':
        return render(request, 'cat/fridge.html', context)
    else:
        # to demonstrate the AJAX concept 
        if request.is_ajax():
            
            # OFFSET and LIMIT will be used in sql queries later.
            if int(request.POST['OFFSET']) == 0 and int(request.POST['OFFSET']) == 0:
                catOwner = User.objects.get(id = request.user.id)

                catQuerySet = Cat.objects.all().filter(owner = catOwner)

                serializer = CatDetailSerializer(catQuerySet, many=True)

                return JsonResponse(serializer.data, safe=False)


@login_required(login_url='/cat/login')
def getAllCatFromUser(request):
    if request.is_ajax():
        catOwner = User.objects.get(id = request.POST['userID'])
        catQuerySet = Cat.objects.all().filter(owner = catOwner)
        serializer = CatDetailSerializer(catQuerySet, many=True)
        return JsonResponse(serializer.data, safe=False)

@login_required(login_url='/cat/login')
def getUserDetail(request):
    if request.is_ajax():
        extraUserInfo = getExtraUserInfo(request.user.id)

        ip, is_routable = get_client_ip(request)

        # ideally, we should display the last login IP. The following stuff is only for fulfilling the requirements of project 4. (No hard feelings tho)

        RES = {}
        RES['ip_info'] = IPLocationSerializer(getLocationForIP(str(ip)), many=False).data
        RES['user_info'] = extraUserInfo.data

        return JsonResponse(RES, safe=False)

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
def search(request):

    # the search module needs to be completely redo width Ajax
 
    lastSearchOption = 'cat'
    isSearch = False
    searchResult = {}

    if 'lastSearchOption' in request.session:
        lastSearchOption = request.session['lastSearchOption']

    if request.is_ajax() and request.method == "POST":
        searchResult['content'], searchResult["Exist"], searchResult['isCat'] = queryKeywordFromDB(request.POST['keyword'].strip(), request.POST['search-option'])

        request.session['lastSearchOption'] = request.POST['search-option']

        return JsonResponse(searchResult, safe=False)
    
    else:
        context = {
            'username': request.user.username, 
            'email': request.user.email, 
            'lastSearchOption': lastSearchOption, 
        }
    
        return render(request, 'cat/search.html', context)    
    

# @lru_cache(maxsize = 128)
# for such fast changing content, using LRU cache may not be very appropriate
def queryKeywordFromDB(keyword, type):

    try:
        ifExist = True
        if type == 'cat':
            res = Cat.objects.get(id = int(keyword))
            res = CatDetailSerializer(res, many=False).data
        else:
            user = User.objects.get(username = keyword)
            res = User_Extra.objects.filter(user = user)
            res = UserExtraSerializer(res, many=True).data
    except:
        res = None
        ifExist = False
            
    return [res, ifExist, type == 'cat']


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
def updateUserAbout(request):
    if request.is_ajax() and request.method == "POST":

        extraUser = User_Extra.objects.get(user = request.user)
        newAbout = request.POST['new-info']
        extraUser.about = newAbout
        extraUser.save()

        return HttpResponse("1")
    
    return HttpResponse("0")


@login_required(login_url='/cat/login')
def updateUserBirthday(request):
    if request.is_ajax() and request.method == "POST":
    
        extraUser = User_Extra.objects.get(user = request.user)
        newBirthday = request.POST['new-info']
        extraUser.birthdate = newBirthday
        extraUser.save()

        return HttpResponse("1")
    
    return HttpResponse("0")

@login_required(login_url='/cat/login')
def activity(request):
    context = {'username': request.user.username, 'email': request.user.email}
    if request.method == 'GET':
        return render(request, 'cat/activity.html', context)
    
    if request.method == 'POST':
        if request.is_ajax():
            return JsonResponse(recordHistory)


def login(request):
    # User tries to sign in
    if request.method == 'POST':
        user = authenticate(request, username = request.POST.get("username"), password = request.POST.get("password"))
        if user is not None:
            auth.login(request, user)
            return redirect("/cat")
        else:
            return render(request, 'cat/login.html', {'errormessage': 'Invalid username and/or password.'})

    # GET request for logout
    auth.logout(request)
    return render(request, 'cat/login.html', {})


def register(request):
    # user submitted their registering info
    if request.method == 'POST':

        username = request.POST.get("register-username")
        password = request.POST.get("register-password")
        email = request.POST.get("register-email")

        if User.objects.filter(username=username).exists():
            # Username is not valid, raise error
            return render(request, 'cat/register.html', {'errormessage': 'Username already exists!'})
        
        if User.objects.filter(email=email).exists():
            # Email is not valid, raise error
            return render(request, 'cat/register.html', {'errormessage': 'E-mail has already been used!'})
        
        # # Password Validator might be implemented later.
        # if validate_password(password, username=username) is not None:
        #     return render(request, 'cat/register.html', {'errormessage': 'Please use a different password'})

        # create user
        user = User.objects.create_user(username, email, password)
        user.save()

        extraUserInfo = User_Extra(
            user = user,
            about = "Nothing to tell...",
            birthdate = "1970-01-01"
        )

        extraUserInfo.save()
        
        # login the new user and redirect to index
        auth.login(request, user)
        return redirect("/cat")

    # GET request for accessing the view
    auth.logout(request)
    return render(request, 'cat/register.html', {})



recordHistory = {
    "1": {
        "date": "2021-10-01",
        "content": "Cathy took your cat Lucy for a date.",
        "involved": "Cathy"
    },
    "2": {
        "date": "2021-10-02",
        "content": "Lily took your cat Lucy for a date.",
        "involved": "Lily"
    },
    "3": {
        "date": "2021-10-02",
        "content": "Lily took your cat Lucy for a date.",
        "involved": "Lily"
    },
    "4": {
        "date": "2021-10-02",
        "content": "Lily took your cat Lucy for a date.",
        "involved": "Lily"
    },
    "5": {
        "date": "2021-10-02",
        "content": "Lily took your cat Lucy for a date.",
        "involved": "Lily"
    },
}