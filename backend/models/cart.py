from database.connection import connect
class cart:
    def __init__(self, userid, itemid, quantity):
        self.userid = userid
        self.itemid = itemid
        self.quantity = quantity
        
    def __repr__(self):
        return f"cart(userid={self.userid}, itemid={self.itemid}, quantity={self.quantity})"
    
    def add_item_to_cart(itemid, quantity, userid):
        cur = connect().cursor()
        cur.execute("SELECT * FROM cart WHERE USERID = ? AND ITEMID = ?", (userid, itemid))
        if cur.fetchone() is not None:
            cur.execute("UPDATE shoppingcart SET QUANTITY = QUANTITY + ? WHERE USERID = ? AND ITEMID = ?", (quantity, userid, itemid))
        else:
            cur.execute("INSERT INTO cart (USERID, ITEMID, QUANTITY) VALUES (?, ?, ?)", (userid, itemid, quantity))
        connect().commit()
        print("Item added to cart.")
    
    def remove_item_from_cart(itemid, userid):
        cur = connect().cursor()
        cur.execute("DELETE FROM cart WHERE USERID = ? AND ITEMID = ?", (userid, itemid))
        connect().commit()
        print("Item removed from cart.")