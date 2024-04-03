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