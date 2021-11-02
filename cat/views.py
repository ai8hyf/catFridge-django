from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Cat, User_Extra
from functools import lru_cache
from .serializers import *




def getExtraUserInfo(user_id):

    currentUser = User.objects.get(id = user_id)
    # extraUser = {}
    # extraUser['exist'] = False
    extraUser, created = User_Extra.objects.get_or_create(user = currentUser, defaults={
        'user': currentUser,
        "about": "",
        "birthdate": "1970-01-01",
    })

    extraUser = UserExtraSerializer(extraUser, many = False)

    # if User_Extra.objects.filter(user = currentUser).exists():
    #     extraUser = UserExtraSerializer(User_Extra.objects.get(user = currentUser), many = False)
    #     extraUser['exist'] = True

    return extraUser


@login_required(login_url='/cat/login')
def index(request):
    context = {'username': request.user.username, 'email': request.user.email}
    return render(request, 'cat/index.html', context)


@login_required(login_url='/cat/login')
def fridge(request):

    context = {'username': request.user.username, 'email': request.user.email}

    if request.method == 'GET':

        # extraUserInfo = getExtraUserInfo(request.user.id)
        # print(extraUserInfo['exist'])
        # print(extraUserInfo)

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
def getUserDetail(request):
    if request.is_ajax():
        extraUserInfo = getExtraUserInfo(request.user.id)
        return JsonResponse(extraUserInfo.data, safe=False)

@login_required(login_url='/cat/login')
def addCat(request):
    if request.method == "POST" and request.is_ajax():

        oneCat = request.POST

        newCat = Cat(
            owner = User.objects.get(id = request.user.id),
            # borrower = "",
            catName = oneCat['catName'],
            catDesc = oneCat['catMotto'],
            catHealth = 50,
            catHappiness = 50,
            catWeight = 50,
            catAge = 0, # in minutes
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
   

@login_required(login_url='/cat/login')
def search(request):

    lastSearchOption = 'cat'
    isSearch = False
    searchResult = {}

    if 'lastSearchOption' in request.session:
        lastSearchOption = request.session['lastSearchOption']
    
    if request.method == "GET" and 'keyword' in request.GET and request.GET['keyword'] != '':
        keyword = request.GET['keyword'].strip()

        searchResult['content'], searchResult["Exist"], searchResult['isCat'] = queryKeywordFromDB(keyword, request.GET['search-option'])

        isSearch = True
        request.session['lastSearchOption'] = request.GET['search-option']
        lastSearchOption = request.session['lastSearchOption']
    
    context = {
        'username': request.user.username, 
        'email': request.user.email, 
        'isSearch': isSearch, 
        'lastSearchOption': lastSearchOption, 
        'searchResult': searchResult
    }
    
    return render(request, 'cat/search.html', context)


@lru_cache(maxsize = 128)
def queryKeywordFromDB(keyword, type):

    # I plan to add more magic to the search function in the future

    try:
        ifExist = True
        if type == 'cat':
            res = Cat.objects.get(id = int(keyword))
        else:
            res = User.objects.get(username = keyword)
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