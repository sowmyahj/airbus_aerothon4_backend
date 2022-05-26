from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from tutorials.models import User
from tutorials.serializers import UserSerializer,UserOneSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST'])
def tutorial_list(request):
    if request.method == 'GET':
        tutorials = User.objects.all()
        
        username = request.GET.get('title', None)
        if username is not None:
            tutorials = tutorials.filter(title__icontains=username)
        
        tutorials_serializer = UserOneSerializer(tutorials, many=True)
        return JsonResponse(tutorials_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        tutorial_data = JSONParser().parse(request)
        tutorial_serializer = UserSerializer(data=tutorial_data)
        if tutorial_serializer.is_valid():
            #tutorial_serializer.save() // save data to db
            obj = User.objects.filter(user_name=tutorial_data.get("user_name")).values("password")
            #print("objj",obj)

            secret_key = ""
            for pwd in obj:
                print("line", pwd.get("password"))
                secret_key = pwd.get("password")
                
            if secret_key == tutorial_data.get("password"):
                return JsonResponse({'response':'success'}, status=status.HTTP_200_OK) 
            else:
                return JsonResponse({'response':'failure'}, status=status.HTTP_401_UNAUTHORIZED)

        return JsonResponse({'response':'failure'}, status=status.HTTP_400_BAD_REQUEST)
    
    

