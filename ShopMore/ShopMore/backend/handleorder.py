from .database.connection import *

def add_order(order):
        cur = connect().cursor()
        cur.execute("INSERT INTO orders (USERID, ORDERDATE, ORDERSTATUS, ORDERTOTAL) VALUES (?, ?, ?, ?)", (order.userID, order.orderDate, order.orderStatus, order.orderTotal))
        orderID = cur.lastrowid
        for item in order.orderItems:
            cur.execute("INSERT INTO orderitems (ORDERID, ITEMID, QUANTITY) VALUES (?, ?, ?)", (orderID, item.itemid, item.quantity))
        connect().commit()
        print("Order added to database.")
    
    
def edit_order_status(orderID, orderStatus):
        cur = connect().cursor()
        cur.execute("UPDATE orders SET ORDERSTATUS = ? WHERE ORDERID = ?", (orderStatus, orderID))
        connect().commit()
        print("Order status updated.")

def delete_order(orderID):
        cur = connect().cursor()
        cur.execute("DELETE FROM orders WHERE ORDERID = ?", (orderID))
        connect().commit()
        print("Order deleted from database.")