
from .models.order import *
from .models.user import User as UserList
from django.shortcuts import render, redirect, get_object_or_404
from datetime import datetime
import json
from ShopMore.serializers import OrderSerializer

# List all orders of a user
def list_order(userID):
        orderlist =  Order.objects.filter(userID=userID).all()
        orderlist_s = OrderSerializer(instance=orderlist, many=True)
        return orderlist_s.data

#Add an order after the user has checked out
def add_order(userID, orderItems, total):
        orderDate = str(datetime.today().strftime('%Y-%m-%d'))
        Order_count = Order.objects.count()+1
        json_object = json.loads(orderItems)
        print(json_object)
        user = UserList.objects.get(user_id=userID)
        address = user.address
        
        order1 = Order(orderID = Order_count,userID=userID, orderDate=orderDate, orderStatus=0, orderItems=json_object, orderTotal=total, address=address)
        order1.save()
        return Order_count
# Edit an order status
def edit_order_status(orderID, orderStatus):
        Order.objects.filter(orderID=orderID).update(orderStatus=orderStatus)
# Delete an order by orderID
def delete_order(orderID):
        Order.objects.filter(orderID=orderID).delete()