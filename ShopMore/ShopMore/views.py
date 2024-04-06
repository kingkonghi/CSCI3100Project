from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.middleware import csrf
from django.views.decorators.csrf import csrf_exempt
from .backend.handlefavoritelist import *
from rest_framework import status
from .register import registerfunction
from .login import loginfunction
from .backend.handleitem import *
from .backend.handlecart import *
from .backend.handleorder import *
from .backend.handleuser import *

@api_view(['GET'])
def hello(request):
    return HttpResponse("Hello world ! ")

@api_view(['POST'])
def login(request):
    response = loginfunction(request)
    return response

@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
   response = registerfunction(request)
   return response

def edit_info(request):
    return HttpResponse('edit_info')

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def add_to_favorite(request):
    if request.method == 'POST':
        item_id = request.data.get('item_id')
        user_id = request.user.id

        response = add_favorite(user_id, item_id)

        return Response({'success': True, 'response': response})
    return Response({'success': False})

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def delete_favorite(request, favorite_id):
    response = delete_favorite_item(favorite_id)
    return Response({'success': True, 'response': response})
    

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

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed! for {}".format(request.user.email))

@api_view(['GET'])
def test_view(request):
    csrf_token = csrf.get_token(request)
    return HttpResponse(csrf_token)