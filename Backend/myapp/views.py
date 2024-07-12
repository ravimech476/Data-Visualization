from django.shortcuts import render
from django.db.models import  Q 
from rest_framework.generics import ListAPIView
from django.http import HttpResponse,JsonResponse
import time
from .models import *
from .serializer import *
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from .resources import PersonResource
from tablib import Dataset
import os
import pandas as pd
import json




# Create your views here.

 # Movie CRUD Operation

class MoviesCRUD(ListAPIView):

    queryset = Movies.objects.all()
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
    
            serialize = MovieSerializer(data=data)
            if serialize.is_valid():
                serialize.save()
                output = JSONRenderer().render(serialize.data)
                return HttpResponse(output, content_type='application/json', status=status.HTTP_201_CREATED)
            output = JSONRenderer().render(serialize.errors)
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, *args, **kwargs):
        try:
            data = request.query_params
            id = data['id']
            module = Movies.objects.get(id=id)
            serializer = MovieSerializer(module)
            output = JSONRenderer().render(serializer.data)
            return HttpResponse(output, content_type='application/json')
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            data = request.data
            # data = request
       
            id=data['id']
            module = Movies.objects.get(id=id)
            serialize = MovieSerializer(instance=module, data=request.data)
            if serialize.is_valid():
                serialize.save()
                output = JSONRenderer().render(serialize.data)
                return HttpResponse(output, content_type='application/json', status=status.HTTP_201_CREATED)
            output = JSONRenderer().render(serialize.errors)
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
           
            data=request.query_params
            # data = request
            id = data['id']
            module1 = Movies.objects.get(id=id)
            module = Movies.objects.get(id=id).delete()
            output = JSONRenderer().render("Deleted Successfully")
            return HttpResponse(output, content_type='application/json')
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

# Movies CSV Upload

class MoviesDataUpload(ListAPIView):
  
    def post(self,request,*args,**kwargs):
        
        db=request.headers
        person_resource = PersonResource()
        dataset = Dataset()
        print("request",request.data)
        new_data = request.FILES
        file_key = next(iter(request.FILES), None)
        if not file_key:
            output = JSONRenderer().render({"Error": "No file provided"})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

        new_data = request.FILES[file_key]
        if not os.path.splitext(new_data.name)[1] == '.xlsx':
            output = JSONRenderer().render("Wrong Format")
            return HttpResponse(output, content_type='application/json')
        df = pd.read_excel(new_data, header=None, skiprows=1)
        # Remove empty rows
        df.dropna(how='all', inplace=True)
        df.columns = ['MOVIES','YEAR', 'GENRE', 'RATING', 'ONE-LINE', 'STARS', 'VOTES', 'RunTime', 'Gross']
        imported_data = df.values.tolist()
        if not imported_data or len(imported_data[0]) < 9:
            output = JSONRenderer().render({"Error": "Empty file or insufficient columns"})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
        print("len",len(imported_data))
        for i, data in enumerate(imported_data, start=2):
            print("data",data)
            try:
                value = Movies.objects.create(
                    Movie_Name=data[0],
                    Year=data[1],
                    Genre=data[2],
                    Rating=data[3],
                    One_Line=data[4],
                    Stars=data[5],
                    Votes=data[6],
                    Run_Time=data[7],
                    Gross=data[8]
                )
               
            except Exception as e:
                output = JSONRenderer().render({"Error": str(e)})
                return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

        
        return JsonResponse({"Result":"Uploaded Successfully"})

# Chart Functionality 
class TopGrossMovies(ListAPIView):
    
    def get(self, request, *args, **kwargs):
        try:
            data = request.query_params
            module = Movies.objects.filter(Year=data['year']).exclude(Gross__exact=None).exclude(Gross__iexact='nan').order_by('-Gross')[:5]
            serializer = MovieSerializer(module,many=True)
            output = JSONRenderer().render(serializer.data)
            return HttpResponse(output, content_type='application/json',status=status.HTTP_200_OK)
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

class TopVotesMovies(ListAPIView):
    
    def get(self, request, *args, **kwargs):
        try:
            data = request.query_params
            module = Movies.objects.all().exclude(Votes__exact=None).exclude(Votes__iexact='nan').order_by('-Votes')[:5]
            serializer = MovieSerializer(module,many=True)
            output = JSONRenderer().render(serializer.data)
            return HttpResponse(output, content_type='application/json',status=status.HTTP_200_OK)
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

class TopRatingMovies(ListAPIView):

    def get(self, request, *args, **kwargs):
        try:
            data = request.query_params
            module = Movies.objects.filter(Year=data['year']).exclude(Rating__exact=None).exclude(Rating__iexact='nan').order_by('-Rating')[:10]
            serializer = MovieSerializer(module,many=True)
            output= JSONRenderer().render(serializer.data)
            rating=json.loads(output)
            res=[{"name":i['Movie_Name'],'value':float(i['Rating'])}for i in rating]
            # output = JSONRenderer().render(serializer.data)
            print("res",res)
            return JsonResponse({"Result":res})
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)
    

# Getting the Years of Movies 

class Moviesyears(ListAPIView):
    queryset = Movies.objects.all()
    def get(self, request, *args, **kwargs):
        try:
            data = request.query_params
            module = Movies.objects.all()
            serializer = MovieSerializer(module,many=True)
            output = JSONRenderer().render(serializer.data)
            out=json.loads(output)
            ye=[i['Year'] for i in out]
            unique_years=set(ye)
            updated_year=list(unique_years)
            return JsonResponse({"Result":updated_year})
        except Exception as e:
            output = JSONRenderer().render({"Error": str(e)})
            return HttpResponse(output, content_type='application/json', status=status.HTTP_400_BAD_REQUEST)

