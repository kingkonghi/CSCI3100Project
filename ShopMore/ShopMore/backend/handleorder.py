from .database.connection import connect
from .models.order import *
from .models.user import User as UserList
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
        Order_count = Order.objects.count()+1
        json_object = json.loads(orderItems)
        print(json_object)
        user = UserList.objects.get(user_id=userID)
        address = user.address
        
        order1 = Order(orderID = Order_count,userID=userID, orderDate=orderDate, orderStatus=0, orderItems=json_object, orderTotal=0, address=address)
        order1.save()
        return Order_count

    
def edit_order_status(orderID, orderStatus):
        Order.objects.filter(orderID=orderID).update(orderStatus=orderStatus)

def delete_order(orderID):
        Order.objects.filter(orderID=orderID).delete()