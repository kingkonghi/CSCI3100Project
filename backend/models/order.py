def __init__(self, orderID, userID, orderDate, orderStatus, orderTotal, orderItems):
    self.orderID = orderID
    self.userID = userID
    self.orderDate = orderDate
    self.orderStatus = orderStatus
    self.orderTotal = orderTotal
    self.orderItems = orderItems

def __repr__(self):
    return f"order(orderID={self.orderID}, userID={self.userID}, orderDate={self.orderDate}, orderStatus={self.orderStatus}, orderTotal={self.orderTotal}, orderItems={self.orderItems})"

def add_order(order):
    cur.execute("INSERT INTO orders (USERID, ORDERDATE, ORDERSTATUS, ORDERTOTAL) VALUES (?, ?, ?, ?)", (order.userID, order.orderDate, order.orderStatus, order.orderTotal))
    orderID = cur.lastrowid
    for item in order.orderItems:
        cur.execute("INSERT INTO orderitems (ORDERID, ITEMID, QUANTITY) VALUES (?, ?, ?)", (orderID, item.itemid, item.quantity))
    conn.commit()
    print("Order added to database.")