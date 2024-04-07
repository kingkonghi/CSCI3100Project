from .database.connection import connect
from .models.order import *
conn=connect()

def list_order(userid):
        rows = Order.objects.filter(userID=userid).all()
        print(rows)
        return rows

def add_order(order):
        Order_count = Order.objects.count()
        order1 = Order(orderID = Order_count+1,userID=order.userID, orderDate=order.orderDate, orderStatus=order.orderStatus, orderItems=order.orderItems, orderTotal=order.orderTotal)
        order1.save()
        print("Order added.")

    
def edit_order_status(orderID, orderStatus):
        Order.objects.filter(orderID=orderID).update(orderStatus=orderStatus)

def delete_order(orderID):
        Order.objects.filter(orderID=orderID).delete()