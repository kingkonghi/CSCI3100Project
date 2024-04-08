from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core import serializers
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
from .backend.handlerecommendation import *

import paypalrestsdk
from django.conf import settings
from django.shortcuts import render, redirect
from django.urls import reverse

paypalrestsdk.configure({
    "mode": "sandbox",  # Change to "live" for production
    "client_id": 'AUa1rfUgzv8xxIVJa4Bq1kdQE7y7X1KjwuFl21Anr7xmJSIQ9YosRGF4dNf-GJasV_c81_E6mnEH4jXg',
    "client_secret": 'EPUqMwS7TahZ0KvqalVuNnRFQUYNJtHdSs82mOkufIqh4TMScqikRkfscDp62xjQ69kH-sjv9WQc28Dj',
})

def create_payment(request):
    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal",
        },
        "redirect_urls": {
            "return_url": "http://localhost:8000/execute_payment",
            "cancel_url": "http://localhost:8000/payment_failed",
        },
        "transactions": [
            {
                "amount": {
                    "total": "10.00",  # Total amount in USD
                    "currency": "HKD",
                },
                "description": request.itemDescription,
            }
        ],
    })

    if payment.create():
        return redirect(payment.links[1].href)  # Redirect to PayPal for payment
    else:
        return render(request, 'payment_failed.html')
    
def execute_payment(request):
    payment_id = request.GET.get('paymentId')
    payer_id = request.GET.get('PayerID')

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({"payer_id": payer_id}):
        return render(request, 'payment_success.html')
    else:
        return render(request, 'payment_failed.html')
    
def payment_failed(request):
    return render(request, 'payment_failed.html')

def payment_checkout(request):
    return render(request, 'checkout.html')

@api_view(['GET'])
def hello(request):
    rows = list_item()
    output = ""
    for row in rows:
        output += f"{row.itemName} - {row.itemDescription} - {row.itemCategory} - {row.itemImage} - {row.itemPrice} - {row.itemQuantity} - {row.itemStatus} "
    return HttpResponse(output)

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

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def user(request,userID):
    print(userID)
    user_info = list_user_info(userID)
    serialized_user_info = serializers.serialize('json', user_info)
    return JsonResponse({'message': serialized_user_info})

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def edit_info(request):
    username = request.data.get('username')
    accountType = request.data.get('accountType')
    password = request.data.get('password')
    email = request.data.get('email')
    profilePhoto = request.data.get('profilePhoto')
    address = request.data.get('address')

    response = edit_user(request.user, username=username, accountType=accountType, password=password, email=email, profilePhoto=profilePhoto, address=address)

    return JsonResponse({'message': response})
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt  #csrf_exempt is just for testing, if frontend can get csrf_token, can remove this
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
@csrf_exempt #csrf_exempt is just for testing, if frontend can get csrf_token, can remove this
def delete_favorite(request, favorite_id):
    response = delete_favorite_item(favorite_id)
    return Response({'success': True, 'response': response})
    
@api_view(['GET'])
def product(request):
    row = list_item()
    return HttpResponse(row)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt  #csrf_exempt is just for testing, if frontend can get csrf_token, can remove this
def recommendation (request):
    recommended_items = generate_recommendation(request.user)
    item_ids = list(recommended_items.values_list('itemID', flat=True))
    recommendation_items = Item.objects.filter(itemID__in = item_ids)
    response_data = {
        'recommended items': list(recommendation_items.values())
    }

    return JsonResponse(response_data)

@api_view(['GET'])
def cart(request):
    row = list_cart(request.data.get('userID'))
    return HttpResponse(row)

@api_view(['GET'])
def order(request):
    row = list_order(request.data.get('userID'))
    return HttpResponse(row)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed! for {}".format(request.user.email))

@api_view(['GET'])
def test_view(request):
    csrf_token = csrf.get_token(request)
    return HttpResponse(csrf_token)