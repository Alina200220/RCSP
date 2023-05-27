
from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
  
    path('aparts/', ApUpdate.as_view()),
    path('aparts/get', ApartmentsListCreate.as_view()),

    #path('update/<int:pk>', ApartmentsUpdate.as_view())
    
    
]