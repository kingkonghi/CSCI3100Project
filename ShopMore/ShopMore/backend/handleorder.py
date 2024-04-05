from .database.connection import connect

conn=connect()

def add_order(order):
        cur = conn.cursor()
        cur.execute("INSERT INTO orderlist (USERID, ORDERDATE, ORDERSTATUS, ORDERTOTAL) VALUES (?, ?, ?, ?)", (order.userID, order.orderDate, order.orderStatus, order.orderTotal))
        conn.commit()
        print("Order added to database.")
        cur.close()
    
    
def edit_order_status(orderID, orderStatus):
        cur = conn.cursor()
        cur.execute("UPDATE orderlist SET ORDERSTATUS = ? WHERE ORDERID = ?", (orderStatus, orderID))
        conn.commit()
        print("Order status updated.")
        cur.close()

def delete_order(orderID):
        cur = conn.cursor()
        cur.execute("DELETE FROM orderlist WHERE ORDERID = ?", (orderID))
        conn.commit()
        print("Order deleted from database.")
        cur.close()