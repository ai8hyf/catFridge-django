from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

@login_required(login_url='/cat/login')
def index(request):
    context = {'username': request.user.username}
    return render(request, 'cat/index.html', context)

@login_required(login_url='/cat/login')
def fridge(request):
    context = {'username': request.user.username}
    return render(request, 'cat/fridge.html', context)

@login_required(login_url='/cat/login')
def borrow(request):
    context = {'username': request.user.username}
    return render(request, 'cat/borrow.html', context)

@login_required(login_url='/cat/login')
def activity(request):
    context = {'username': request.user.username}
    return render(request, 'cat/activity.html', context)


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

        user = User.objects.create_user(request.POST.get("register-username"), request.POST.get("register-email"), request.POST.get("register-password"))
        
        if user is not None:
            auth.login(request, user)
            return redirect("/cat")
        else:
            return render(request, 'cat/login.html', {'errormessage': 'Invalid username and/or password.'})

    # GET request for accessing the view
    auth.logout(request)
    return render(request, 'cat/register.html', {})


    return render(request, 'cat/register.html', {})

def validate(request):
    request.session['username'] = ''

    # the credential should have come from the db 
    credentials = {'username': 'yifei', 'password': 'hu', 'email': 'yifei@hu.com'}

    if request.method == 'POST':
        if (request.POST.get("username") == credentials['username'] or request.POST.get("username") == credentials['email']) and request.POST.get("password") == credentials['password']:
            # set session
            request.session['username'] = request.POST.get("username")
            # redirect (url will change)
            return redirect("/cat")
        else:
            # login page with error message
            return render(request, 'cat/login.html', {'errormessage': 'Invalid username and/or password.'})
    else:
        return render(request, 'cat/login.html', {})

def check_session(r):
    if 'username' in r.session and r.session['username'] != '':
        return True
    return False