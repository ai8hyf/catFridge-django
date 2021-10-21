from typing import Pattern
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('CNIT581-048-project3/', include('cat.urls')),
    path('cat/', include('cat.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls'))
]