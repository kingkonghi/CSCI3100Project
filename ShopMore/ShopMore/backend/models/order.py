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

