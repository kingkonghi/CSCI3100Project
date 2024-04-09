from .database.connection import connect
from .models.order import *
from datetime import datetime
import json

def list_order(orderID):
        rows = Order.objects.filter(orderID=orderID).all()
        out = ""
        for i in rows:
            out = i.orderItems
        return out

def add_order(userID, orderItems):
        orderDate = str(datetime.today().strftime('%Y-%m-%d'))
        Order_count = Order.objects.count()
        json_object = json.loads(orderItems)
        print(json_object)
        order1 = Order(orderID = Order_count+1,userID=userID, orderDate=orderDate, orderStatus=0, orderItems=json_object, orderTotal=0)
        order1.save()
        print("Order added.")

    
def edit_order_status(orderID, orderStatus):
        Order.objects.filter(orderID=orderID).update(orderStatus=orderStatus)

def delete_order(orderID):
        Order.objects.filter(orderID=orderID).delete()