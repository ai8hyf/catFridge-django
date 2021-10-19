from django.urls import path

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
]