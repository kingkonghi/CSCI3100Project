import mariadb
import sys
try:
    conn = mariadb.connect(
        user="root",
        password="csci3100",
        host="119.246.239.30",
        port=3306,
        database="ShopMore"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)
print("Connected to MariaDB")


def list_item():
    cur = conn.cursor()
    cur.execute("SELECT * FROM item")
    for(itemid, itemname, itemdesc, itemcategory, itemimage, itemprice, itemquantity, itemstatus) in cur:
        print(f"Item ID: {itemid}, Item Name: {itemname}, Item Description: {itemdesc}, Item Category: {itemcategory}, Item Image: {itemimage}, Item Price: {itemprice}, Item Quantity: {itemquantity}, Item Status: {itemstatus}")
    cur.close()

def add_item():

    cur = conn.cursor()
    cur.execute("INSERT INTO item (name, description, category, image, price, quantity, status) VALUES ('Test Item1', 'Test Description1', 1, '', 200, 1, 1)")
    conn.commit()
    print("Item added.")
    cur.close()

<<<<<<< HEAD
def edit_item():
=======
def edit_item_quantity(item):
>>>>>>> 889435c64e56a840ad6fd39ca0326291ebf3f2d0
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
<<<<<<< HEAD
add_item()
=======
    
list_item()
>>>>>>> 889435c64e56a840ad6fd39ca0326291ebf3f2d0
