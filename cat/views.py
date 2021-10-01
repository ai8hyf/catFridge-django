from django.shortcuts import render
from django.shortcuts import redirect

def index(request):
    if(check_session(request)):
        context = {'username': request.session['username']}
        return render(request, 'cat/index.html', context)
    else:
        return redirect("/cat/login/")

def fridge(request):
    if(check_session(request)):
        context = {'username': request.session['username']}
        return render(request, 'cat/fridge.html', context)
    else:
        return redirect("/cat/login/")

def borrow(request):
    if(check_session(request)):
        context = {'username': request.session['username']}
        return render(request, 'cat/borrow.html', context)
    else:
        return redirect("/cat/login/")

def activity(request):
    if(check_session(request)):
        context = {'username': request.session['username']}
        return render(request, 'cat/activity.html', context)
    else:
        return redirect("/cat/login/")

def login(request):
    request.session['username'] = ''
    context = {'username': ''}
    return render(request, 'cat/login.html', context)

def register(request):
    request.session['username'] = ''
    context = {'username': ''}
    return render(request, 'cat/register.html', context)

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
    return r.session['username'] != ''