import mariadb
import sys

try:
    conn = mariadb.connect(
        user="root",
        password="csci3100",
        host="localhost",
        database="ShopMore"
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

cur = conn.cursor()
def add_order(order):
    cur.execute("INSERT INTO orders (USERID, ORDERDATE, ORDERSTATUS, ORDERTOTAL) VALUES (?, ?, ?, ?)", (order.userID, order.orderDate, order.orderStatus, order.orderTotal))
    orderID = cur.lastrowid
    for item in order.orderItems:
        cur.execute("INSERT INTO orderitems (ORDERID, ITEMID, QUANTITY) VALUES (?, ?, ?)", (orderID, item.itemid, item.quantity))
    conn.commit()
    print("Order added to database.")
    
def edit_order_status(orderID, orderStatus):
    cur.execute("UPDATE orders SET ORDERSTATUS = ? WHERE ORDERID = ?", (orderStatus, orderID))
    conn.commit()
    print("Order status updated.")

def delete_order(orderID):
    cur.execute("DELETE FROM orders WHERE ORDERID = ?", (orderID,))
    conn.commit()
    print("Order deleted from database.")