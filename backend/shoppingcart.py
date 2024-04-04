import mariadb
import sys
from database.connection import *

conn = connect()
cur = conn.cursor()

def add_item_to_cart(itemid, quantity, userid):
    cur.execute("SELECT * FROM cart WHERE USERID = ? AND ITEMID = ?", (userid, itemid))
    if cur.fetchone() is not None:
        cur.execute("UPDATE shoppingcart SET QUANTITY = QUANTITY + ? WHERE USERID = ? AND ITEMID = ?", (quantity, userid, itemid))
    else:
        cur.execute("INSERT INTO cart (USERID, ITEMID, QUANTITY) VALUES (?, ?, ?)", (userid, itemid, quantity))
    conn.commit()
    print("Item added to cart.")
    
def remove_item_from_cart(itemid, userid):
    cur.execute("DELETE FROM cart WHERE USERID = ? AND ITEMID = ?", (userid, itemid))
    conn.commit()
    print("Item removed from cart.")