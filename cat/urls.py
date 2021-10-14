from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('fridge/', views.fridge, name='fridge'),
    path('fridge/add', views.addCat, name='add'),
    path('fridge/get', views.getCat, name='get'),
    path('borrow/', views.borrow, name='borrow'),
    path('activity/', views.activity, name='activity'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]