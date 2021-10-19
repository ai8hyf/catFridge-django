from typing import Pattern
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView

urlpatterns = [
    path('CNIT581-048-project3/', include('cat.urls')),
    path('cat/', include('cat.urls')),
    path('admin/', admin.site.urls),
]