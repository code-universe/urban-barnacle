from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/", include("apis.urls")),
    path("admin/", admin.site.urls),
]
