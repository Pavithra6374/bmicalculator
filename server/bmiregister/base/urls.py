from django.urls import path
from . import views

urlpatterns = [
    path('api/store', views.Save_Person_Details),
]