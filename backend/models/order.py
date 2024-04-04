from database.connection import *
class order:
    def __init__(self, orderID, userID, orderDate, orderStatus, orderTotal, orderItems):
        self.orderID = orderID
        self.userID = userID
        self.orderDate = orderDate
        self.orderStatus = orderStatus
        self.orderTotal = orderTotal
        self.orderItems = orderItems

    def __repr__(self):
        return f"order(orderID={self.orderID}, userID={self.userID}, orderDate={self.orderDate}, orderStatus={self.orderStatus}, orderTotal={self.orderTotal}, orderItems={self.orderItems})"
    
    
    def list_order():
        cur = connect().cursor()
        cur.execute("SELECT * FROM ShopOrder")
        for(orderid, userid, orderdate, orderstatus, ordertotal) in cur:
            print(f"Order ID: {orderid}, User ID: {userid}, Order Date: {orderdate}, Order Status: {orderstatus}, Order Total: {ordertotal}")
        cur.close()

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