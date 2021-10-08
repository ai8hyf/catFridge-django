from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import auth
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password 
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

@login_required(login_url='/cat/login')
def index(request):
    context = {'username': request.user.username, 'email': request.user.email, 'about':request.user.about}
    return render(request, 'cat/index.html', context)

@login_required(login_url='/cat/login')
def fridge(request):
    context = {'username': request.user.username, 'email': request.user.email, 'about':request.user.about}
    return render(request, 'cat/fridge.html', context)

@login_required(login_url='/cat/login')
def borrow(request):
    context = {'username': request.user.username, 'email': request.user.email, 'about':request.user.about}
    return render(request, 'cat/borrow.html', context)

@login_required(login_url='/cat/login')
def activity(request):
    context = {'username': request.user.username, 'email': request.user.email, 'about':request.user.about}
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
    return render(request, 'cat/login.html', {'username': request.user.username, 'email': request.user.email, 'about':request.user.about})


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
        user.about = ""
        user.save()
        
        # login the new user and redirect to index
        auth.login(request, user)
        return redirect("/cat")

    # GET request for accessing the view
    auth.logout(request)
    return render(request, 'cat/register.html', {'username': request.user.username, 'email': request.user.email, 'about':request.user.about})