from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('fridge/', views.fridge, name='fridge'),
    path('fridge/add', views.addCat, name='add'),
    path('search/', views.search, name='search'),
    path('activity/', views.activity, name='activity'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('fridge/updateCatDesc', views.updateCatDesc, name='updateCatDesc'),
    path('uploadHeader', views.uploadHeader, name='uploadHeader'),
    path('updateUserAbout', views.updateUserAbout, name='updateUserAbout'),
    path('updateUserBirthday', views.updateUserBirthday, name='updateUserBirthday'),
    path('getUserDetail', views.getUserDetail, name='getUserDetail'),
]

if settings.DEBUG: 
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root = settings.MEDIA_ROOT
    )