
from .models.order import *
from .models.user import User as UserList
from django.shortcuts import render, redirect, get_object_or_404
from datetime import datetime
import json
from ShopMore.serializers import OrderSerializer

# List all orders of a user
def list_order(userID):
        #Step 1: get all orders of the user
        orderlist =  Order.objects.filter(userID=userID).all()
        #Step 2: serialize the order
        orderlist_s = OrderSerializer(instance=orderlist, many=True)
        #Step 3: return the data of serialized order
        return orderlist_s.data

#Add an order after the user has checked out
def add_order(userID, orderItems, total):
        #Step 1: get the orderdate, orderID, address and user
        orderDate = str(datetime.today().strftime('%Y-%m-%d'))
        Order_count = Order.objects.count()+1
        json_object = json.loads(orderItems)
        user = UserList.objects.get(user_id=userID)
        address = user.address
        #Step 2: create a new order
        order1 = Order(orderID = Order_count,userID=userID, orderDate=orderDate, orderStatus=0, orderItems=json_object, orderTotal=total, address=address)
        order1.save()
        #Step 3: return the number of orders
        return Order_count
# Edit an order status
def edit_order_status(orderID, orderStatus):
        #Step 1: get the order by orderID and update the order status
        Order.objects.filter(orderID=orderID).update(orderStatus=orderStatus)
# Delete an order by orderID
def delete_order(orderID):
        #Step 1: get the order by orderID and delete the order
        Order.objects.filter(orderID=orderID).delete()