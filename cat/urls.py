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
    path('connection/', views.connection, name='connection'),
    path('u/<int:uid>/', views.getUser, name='getUser'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('fridge/updateCatDesc', views.updateCatDesc, name='updateCatDesc'),
    path('uploadHeader', views.uploadHeader, name='uploadHeader'),
    path('updateUserAbout', views.updateUserAbout, name='updateUserAbout'),
    path('updateUserBirthday', views.updateUserBirthday, name='updateUserBirthday'),
    path('updateUserFirstName', views.updateUserFirstName, name='updateUserFirstName'),
    path('updateUserLastName', views.updateUserLastName, name='updateUserLastName'),
    path('getUserDetail', views.getUserDetail, name='getUserDetail'),
    path('getAllCatFromUser', views.getAllCatFromUser, name='getAllCatFromUser'),
    path('subscribe', views.subscribe, name='subscribe'),
    path('unsubscribe', views.unsubscribe, name='unsubscribe'),
    path('checkSubscription', views.checkSubscription, name='checkSubscription'),
    path('getFollowingIds', views.getFollowingIds, name='getFollowingIds'),
    path('getFollowerByName', views.getFollowerByName, name='getFollowerByName'),
    path('getFollowingByName', views.getFollowingByName, name='getFollowingByName'),
    path('getAllNotification', views.getAllNotification, name='getAllNotification'),
    path('getNewNotification', views.getNewNotification, name='getNewNotification'),
    path('checkNewNotification', views.checkNewNotification, name='checkNewNotification'),
]


if settings.DEBUG: 
    urlpatterns += static(
        settings.MEDIA_URL, 
        document_root = settings.MEDIA_ROOT
    )