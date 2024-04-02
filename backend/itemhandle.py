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
        

def list_item():
    cur = conn.cursor()
    cur.execute("SELECT * FROM item")
    for(itemid, itemname, itemdesc, itemcategory, itemimage, itemprice, itemquantity, itemstatus) in cur:
        print(f"Item ID: {itemid}, Item Name: {itemname}, Item Description: {itemdesc}, Item Category: {itemcategory}, Item Image: {itemimage}, Item Price: {itemprice}, Item Quantity: {itemquantity}, Item Status: {itemstatus}")
    cur.close()

def add_item():
    cur = conn.cursor()
    cur.execute("INSERT INTO item (ITEMNAME, ITEMDESC, ITEMCATEGORY, ITEMIMAGE, ITEMPRICE, ITEMQUANTITY, ITEMSTATUS) VALUES ('Test Item', 'Test Description', 'Test Category', 'Test Image', 1, 1, 'Available')")
    conn.commit()
    print("Item added.")
    cur.close()

def edit_item_quantity(item):
    cur = conn.cursor()
    cur.execute("UPDATE item SET ITEMQUANTITY = ? WHERE itemID = ?", (item.quantity,item.itemid))
    conn.commit()
    print("Item quantity updated.")
    cur.close()

def remove_item():
    cur = conn.cursor()
    cur.execute("DELETE FROM item WHERE ITEMNAME = 'Test Item'")
    conn.commit()
    print("Item removed.")
    cur.close()