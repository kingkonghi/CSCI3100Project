from .database.connection import *

def list_item():
        cur = connect().cursor()
        cur.execute("SELECT * FROM item")
        for(itemid, itemname, itemdesc, itemcategory, itemimage, itemprice, itemquantity, itemstatus) in cur:
            print(f"Item ID: {itemid}, Item Name: {itemname}, Item Description: {itemdesc}, Item Category: {itemcategory}, Item Image: {itemimage}, Item Price: {itemprice}, Item Quantity: {itemquantity}, Item Status: {itemstatus}")
        rows = cur.fetchall()
        cur.close()
        return rows

def add_item(name, description, category, image, price, quantity, status):
        cur = connect().cursor()
        cur.execute(f"INSERT INTO item (name, description, category, image, price, quantity, status) VALUES ('{name}', '{description}', '{category}', '{image}', {price}, {quantity}, '{status}')")
        connect().commit()
        print("Item added.")
        cur.close()

def edit_item(name,quantity):
        cur = connect().cursor()
        cur.execute(f"UPDATE item SET QUANTITY = {quantity} WHERE NAME = '{name}'")
        connect().commit()
        print("Item quantity updated.")
        cur.close()

def remove_item(name):
        cur = connect().cursor()
        cur.execute(f"DELETE FROM item WHERE NAME = '{name}'")
        connect().commit()
        print("Item removed.")
        cur.close()