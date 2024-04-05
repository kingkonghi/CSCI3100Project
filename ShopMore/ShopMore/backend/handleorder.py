from .database.connection import connect
from .models.order import *
conn=connect()

def list_order():
        rows = Order.objects.all()
        print(rows)
        return rows

def add_order(order):
        Order_count = Order.objects.count()
        order1 = Order(orderID = Order_count+1,userID=order.userID, orderDate=order.orderDate, orderStatus=order.orderStatus, orderItems=order.orderItems, orderTotal=order.orderTotal)
        order1.save()
        print("Order added.")

    
def edit_order_status(orderID, orderStatus):
        cur = conn.cursor()
        cur.execute("UPDATE orderlist SET ORDERSTATUS = ? WHERE ORDERID = ?", (orderStatus, orderID))
        conn.commit()
        print("Order status updated.")
        cur.close()

def delete_order(orderID):
        Order.objects.filter(orderID=orderID).delete()