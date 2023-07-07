from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Person

@api_view(['POST'])
def Save_Person_Details(request):

    try:
        data = request.data
        person_details = Person.objects.create(
            name = data['name'],
            age = data['age'],
            weight = data['weight'],
            height = data['height'],
            phone_number = data['phoneNumber'],
            bmi_value=data['bmi'],
            category=data["category"]
        )

        
    except Exception as e :

        print(e)

    return Response("Custom time saved successfully.")  

     

    