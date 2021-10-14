from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Cat
from django.core import serializers
import json

@login_required(login_url='/cat/login')
def index(request):
    context = {'username': request.user.username, 'email': request.user.email}
    return render(request, 'cat/index.html', context)

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
                catList = list(Cat.objects.values().filter(owner = request.user.username))
                return JsonResponse(catList, safe=False)


@login_required(login_url='/cat/login')
def addCat(request):
    if request.method == "POST" and request.is_ajax():
        
        print(request.POST)

        oneCat = request.POST

        newCat = Cat(
            owner = request.user.username,
            borrower = "",
            catName = oneCat['catName'],
            catDesc = oneCat['catMotto'],
            catHealth = 50,
            catHappiness = 50,
            catWeight = 50,
            catAge = 0,
            headSize = oneCat['headSize'],
            neckLength = oneCat['neckLength'],
            neckWidth = oneCat['neckWidth'],
            bodyHeight = oneCat['bodyHeight'],
            bodyWidth = oneCat['bodyWidth'],
            tailLength = oneCat['tailLength'],
            faceColor = oneCat['faceColor'],
            bodyColor = oneCat['bodyColor'],
            tailColor = oneCat['tailColor'],
            headGlowColor = oneCat['headGlowColor'],
            bodyTLRadius = oneCat['bodyTLRadius'],
            bodyTRRadius = oneCat['bodyTRRadius'],
            bodyBLRadius = oneCat['bodyBLRadius'],
            bodyBRRadius = oneCat['bodyBRRadius'],
            bodyTatoo = oneCat['bodyTatoo'],
            tatooColor = oneCat['tatooColor'],
            headAlign = oneCat['headAlign']
        )

        newCat.save()

        return HttpResponse("Success")


def getCat(username):
    catList = list(Cat.objects.get(owner = username))    

@login_required(login_url='/cat/login')
def borrow(request):
    context = {'username': request.user.username, 'email': request.user.email}
    return render(request, 'cat/borrow.html', context)

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
        
        # login the new user and redirect to index
        auth.login(request, user)
        return redirect("/cat")

    # GET request for accessing the view
    auth.logout(request)
    return render(request, 'cat/register.html', {})

catFromDB = {
    "TEST01": {
        "catName": "Arthur",
        "catMotto": "I love Jerry",
        "catID": "TEST01",
        "headSize": 100,
        "neckLength": 10,
        "neckWidth": 20,
        "bodyHeight": 200,
        "bodyWidth": 150,
        "tailLength": 150,
        "faceColor": "#ffffff",
        "bodyColor": "#ff0000",
        "tailColor": "#000000",
        "headGlowColor": "#e8ff73",
        "bodyTLRadius": "50%",
        "bodyTRRadius": "50%",
        "bodyBLRadius": "25%",
        "bodyBRRadius": "25%",
        "bodyTatoo": "Supreme",
        "tatooColor": "#ffffff",
        "headAlign": "center"
    },
    "TEST02": {
        "catName": "Brandon", "catMotto": "I'm not a bear.", "catID": "TEST02", "headSize": 40, "neckLength": 100, "neckWidth": 0, "bodyHeight": 200, "bodyWidth": 100, "tailLength": 100, "faceColor": "#000000", "bodyColor": "#000000", "tailColor": "#000000", "headGlowColor": "#000000", "bodyTLRadius": "10%", "bodyTRRadius": "10%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "OffWhite", "tatooColor": "#000000", "headAlign": "left"
    },
    "TEST03": {
        "catName": "Charlie", "catMotto": "I love Jerry", "catID": "TEST03", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 100, "tailLength": 150, "faceColor": "#00ff00", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "LUCK", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST04": {
        "catName": "Dawn", "catMotto": "I love Jerry", "catID": "TEST04", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#ee00ee", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "YYY", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST05": {
        "catName": "Eric", "catMotto": "I love Jerry", "catID": "TEST05", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#0000ff", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Yooo", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST06": {
        "catName": "Frank", "catMotto": "I love Jerry", "catID": "TEST06", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#11ee55", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Hello", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST07": {
        "catName": "Gaga", "catMotto": "I love Jerry", "catID": "TEST07", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#0f0f0f", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Bingo", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST08": {
        "catName": "Harry", "catMotto": "I love Jerry", "catID": "TEST08", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#669900", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Dog", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST09": {
        "catName": "Isaac", "catMotto": "I love Jerry", "catID": "TEST09", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#222222", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Ghost", "tatooColor": "#2176fb", "headAlign": "center"
    },
    "TEST10": {
        "catName": "Jack", "catMotto": "I love Jerry", "catID": "TEST10", "headSize": 200, "neckLength": 100, "neckWidth": 1, "bodyHeight": 50, "bodyWidth": 200, "tailLength": 150, "faceColor": "#22ff00", "bodyColor": "#fdc131", "tailColor": "#000000", "headGlowColor": "#ffffff", "bodyTLRadius": "25%", "bodyTRRadius": "25%", "bodyBLRadius": "25%", "bodyBRRadius": "25%", "bodyTatoo": "Cool", "tatooColor": "#2176fb", "headAlign": "center"
    }
}

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