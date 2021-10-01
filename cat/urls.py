from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('fridge/', views.fridge, name='fridge'),
    path('borrow/', views.borrow, name='borrow'),
    path('activity/', views.activity, name='activity'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('validate/', views.validate, name='validate'),
]