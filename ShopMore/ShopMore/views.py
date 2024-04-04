from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .register import registerfunction
from .login import loginfunction
from .backend.handleitem import *
def hello(request):
    return HttpResponse("Hello world ! ")

@api_view(['POST'])
def login(request):
    response = loginfunction(request)
    return response

@api_view(['POST'])
def register(request):
   response = registerfunction(request)
   return response

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed! for {}".format(request.user.email))


def product(request):
    row = list_item()
    return HttpResponse(row)

@api_view(['GET'])
def cart(request):
    
    return HttpResponse("Cart page")

def checkout(request):
    return HttpResponse("Checkout page")

def order(request):
    return HttpResponse("Order page")