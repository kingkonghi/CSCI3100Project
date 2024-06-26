from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core import serializers as core_serializers
from django.middleware import csrf
from django.views.decorators.csrf import csrf_exempt
from .register import registerfunction
from .login import loginfunction
from .backend.handleitem import *
from .backend.handlecart import *
from .backend.handleorder import *
from .backend.handlefavoritelist import *
from .backend.handleuser import *
from .backend.handlereview import *
from .backend.handlerecommendation import *
from .serializers import *
import paypalrestsdk
from django.shortcuts import render, redirect

paypalrestsdk.configure({
    "mode": "sandbox",  # Change to "live" for production
    "client_id": 'AUa1rfUgzv8xxIVJa4Bq1kdQE7y7X1KjwuFl21Anr7xmJSIQ9YosRGF4dNf-GJasV_c81_E6mnEH4jXg',
    "client_secret": 'EPUqMwS7TahZ0KvqalVuNnRFQUYNJtHdSs82mOkufIqh4TMScqikRkfscDp62xjQ69kH-sjv9WQc28Dj',
})

@csrf_exempt
def create_payment(request):
    data = json.loads(request.body)

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
                    "total": data.get('amount'),
                    "currency": "HKD",
                },
                "description": data.get('description'),
            }
        ],
    })

    if payment.create():
        return JsonResponse({'redirectUrl': payment.links[1].href})  # Redirect to PayPal for payment
    else:
        return JsonResponse({'error': 'Failed to create PayPal payment'}, status=500)
    
def execute_payment(request):
    payment_id = request.GET.get('paymentId')
    payer_id = request.GET.get('PayerID')

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({"payer_id": payer_id}):
        return redirect(f'http://localhost:3000/payment?status=success')
    else:
        return render(request, 'payment_failed.html')
    
def payment_failed(request):
    return render(request, 'payment_failed.html')

def payment_checkout(request):
    return render(request, 'checkout.html')

@api_view(['GET'])
def hello(request):
    return HttpResponse("Hello page")

#login view
@api_view(['POST']) 
def login(request):
    response = loginfunction(request)
    return response

#logout view
@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)

#register view
@api_view(['POST'])
def register(request):
   response = registerfunction(request)
   return response

#show user information 
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def user(request):
    user_info = list_user_info(request.data['userID'])
    serialized_user_info = [
        {
            "accountType": user.accountType,
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "profilePhoto": user.profilePhoto,
            "address": user.address,
            "phoneNo": user.phoneNo
        }
        for user in user_info
    ]
    return Response({'fields': serialized_user_info})

#edit user info
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
    phoneNo = request.data.get('phoneNo')

    response = edit_user(request.user, username=username, accountType=accountType, password=password, email=email, profilePhoto=profilePhoto, address=address, phoneNo=phoneNo)

    return JsonResponse({'message': response})

#add products to favorite list view
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt  #csrf_exempt is just for testing, if frontend can get csrf_token, can remove this
def add_to_favorite(request):
    data = json.loads(request.body)
    item_id = data['item_id']
    user_id = request.user.id

    response = add_favorite(user_id, item_id)
    return Response({'success': True, 'response': response})
    
#display the whole favorite list view
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt 
def display_favorite(request):
    user_id = request.user.id
    favorite_list = get_favorite_list(user_id)
    return JsonResponse(favorite_list, safe=False)

#delete product from favorite list
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt #csrf_exempt is just for testing, if frontend can get csrf_token, can remove this
def delete_favorite(request, itemID):
    user_id = request.user.id
    favorite = get_object_or_404(FavoriteList, userid=user_id, itemid=itemID)
    favorite_id = favorite.favouriteID
    response = delete_favorite_item(favorite_id)
    return Response({'success': True, 'response': response})

#display products
@api_view(["GET"])
def product(request):
    itemlist = []
    for i in Item.objects.all():
        item = get_object_or_404(Item, itemID=i.itemID)
        serializer = ItemSerializer(instance=item)
        itemlist.append(serializer.data)
    return Response({"item": itemlist})

#display info of a specific product
@api_view(["GET"])
def product_specific(request,itemID):
    item = get_object_or_404(Item, itemID=itemID)
    serializer = ItemSerializer(instance=item)
    return Response({"item": serializer.data})

#generate and display product recommendation view
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


#Cart
@api_view(['GET'])
def cart_list(request,userID):
    response = list_cart(userID)
    return Response({'cart': response}, status=status.HTTP_200_OK)

@api_view(['GET'])
def cart_add(request,userID, itemID, quantity):
    response = add_item_to_cart(userID, itemID, quantity)
    return Response({'message': "Successfully added item to cart"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def cart_edit(request,userID, itemID, quantity):
    response = edit_item(userID, itemID, quantity)
    return Response({'message': "Successfully edited item quantity to cart"}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def cart_remove(request,userID, itemID):
    if itemID == "*":
        response = remove_all_items(userID)
    else:
        response = remove_item(userID, itemID)
    return Response({'message': "Successfully deleted item from cart"}, status=status.HTTP_200_OK)

#Order
@api_view(['GET'])
def order(request,userID):
    response = list_order(userID)
    return Response({'message': response},status=status.HTTP_200_OK)

@api_view(['GET'])
def order_add(request,userID,orderItems,total):
    response = add_order(userID,orderItems,total)
    return Response({response}, status=status.HTTP_201_CREATED)
    
@api_view(['DELETE'])
def order_delete(request,orderID):
    response = delete_order(orderID)
    return Response({'message': "Successfully deleted order"}, status=status.HTTP_200_OK)

#Review
@api_view(['GET'])
def review(request):
    response = list_review()
    return Response({'message': response}, status=status.HTTP_200_OK)

@api_view(['GET'])
def review_specific(request,itemID):
    response = list_review_specific(itemID)
    return Response({'message': response}, status=status.HTTP_200_OK)
@api_view(['GET'])
def review_add(request,itemID,userID,Review,Rating):
    response = add_review(userID,itemID,Review,Rating)
    return Response({'message': response}, status=status.HTTP_200_OK)
@api_view(['GET'])
def review_edit(request,itemID,userID,Review,Rating):
    response = edit_review(itemID,userID,Review,Rating)
    return Response({'message': response}, status=status.HTTP_200_OK)
@api_view(['DELETE'])
def review_remove(request,itemID,userID):
    response = delete_review(itemID,userID)
    return Response({'message': response}, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed! for {}".format(request.user.email))

@api_view(['GET'])
def test_view(request):
    csrf_token = csrf.get_token(request)
    return HttpResponse(csrf_token)

#admin function views (CRUD)
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_display_item(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_add_item(request):
    name = request.data.get('name')
    description = request.data.get('description')
    category = request.data.get('category')
    image = request.data.get('image')
    price = request.data.get('price')
    quantity = request.data.get('quantity')
    product_status = request.data.get('status')
    response = add_item(name, description, category, image, price, quantity, product_status)
    return Response({'message': response}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_edit_item(request, pk):
    item = Item.objects.get(pk=pk)
    serializer = ItemSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_delete_item(request, pk):
    response = delete_item(pk)
    return Response({'message': response})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_display_user(request):
    users = UserList.objects.all()
    serializer = UserListSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_add_user(request):
    username = request.data.get('username')
    accountType = request.data.get('accountType')
    password = request.data.get('password')
    email = request.data.get('email')
    profilePhoto = request.data.get('profilePhoto')
    address = request.data.get('address')
    phoneNo = request.data.get('phoneNo')
    user = UserList(
        username = username,
        accountType = accountType,
        password = password,
        email = email,
        profilePhoto = profilePhoto,
        address = address,
        phoneNo = phoneNo
    )
    add_user(user)
    return Response({'message': f"User {username} added."})

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_edit_user(request, pk):
    username = request.data.get('username')
    accountType = request.data.get('accountType')
    password = request.data.get('password')
    email = request.data.get('email')
    profilePhoto = request.data.get('profilePhoto')
    address = request.data.get('address')
    phoneNo = request.data.get('phoneNo')
    user = User(
        id = pk
    )
    status = edit_user(user, username, accountType, password, email, profilePhoto, address, phoneNo)
    return Response({'message': f"User {username} edited." if status == "edited" else "No changes made."})

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def admin_delete_user(request, pk):
    status = delete_user(pk)
    return Response({'message': f"User {pk} deleted."})