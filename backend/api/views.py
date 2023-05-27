from ast import main
import pickle
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from yaml import serialize


from .models import Aparts
from .serializers import ApartmentsSerializer
from rest_framework import generics

import psycopg2 as ps
import pandas as pd
import warnings
from geopy.geocoders import Nominatim
import numpy as np

import backend.finalmodel as mod
 
class ApartmentsListCreate(generics.ListCreateAPIView):
      queryset = Aparts.objects.all()
      serializer_class = ApartmentsSerializer
      permission_classes = (AllowAny,)
      
    

# class ApartmentsUpdate(generics.RetrieveUpdateAPIView):
#      queryset = Aparts.objects.all()
#      serializer_class = ApartmentsSerializer
#      permission_classes = (AllowAny,)
    

  
    
      


class ApUpdate(APIView):
    
    def get(self, request):
        aparts = Aparts.objects.all()
        serializer = ApartmentsSerializer(aparts, many=True)
        #a=main.get_price('Москва, улица Люблинская 76 к5',10,15,'3', 93,11.1,'косметический', 'Братиславская',25,2021)
        #ans=a.predict()
        conn = ps.connect(host="127.0.0.1", port = 5432, database="newapp", user="postgres", password="123456", options="-c search_path=bookings")
        aparts = pd.read_sql("SELECT * FROM public.api_aparts", con=conn).drop('id',axis=1).iloc[-1,:]
        a=mod.get_price(aparts[0],aparts[1],aparts[2],aparts[3], str(aparts[4]),aparts[5],aparts[6], aparts[7],aparts[8],aparts[9])
        ans=a.predict()
        return Response(ans)
        #return Response(serializer.data)
            
    def post(self, request):
        serializer = ApartmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    # def put(self,request,pk):
    #     aparts=request.data
    #     serializer=ApartmentsSerializer(data=aparts)
    #     if serializer.is_valid(raise_exception=True):
    #         aparts_saved=serializer.save()
    #     ans=1+1
    #     return Response(ans)

    
    

