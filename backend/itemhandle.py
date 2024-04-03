import mariadb
import sys

try:
    conn = mariadb.connect(db = 'sql6696311', 
                  user   = 'sql6696311', 
                  passwd = 'kWjC94rLvl', 
                  host   = 'sql6.freemysqlhosting.net',
                  port=3306
                  ) 
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)
        

def list():
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

def edit_item():
    cur = conn.cursor()
    cur.execute("UPDATE item SET ITEMQUANTITY = 2 WHERE itemID = '1'")
    conn.commit()
    print("Item quantity updated.")
    cur.close()

def remove_item():
    cur = conn.cursor()
    cur.execute("DELETE FROM item WHERE ITEMNAME = 'Test Item'")
    conn.commit()
    print("Item removed.")
    cur.close()
    
list()