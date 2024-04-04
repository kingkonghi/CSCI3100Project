from database.connection import *
class Item:
    def __init__(self, ITERID, ITEMNAME, ITEMDESC, ITEMCATEGORY, ITEMIMAGE, ITEMPRICE, ITEMQUANTITY, ITEMSTATUS):
        self.ITERID = ITERID
        self.ITEMNAME = ITEMNAME
        self.ITEMDESC = ITEMDESC
        self.ITEMCATEGORY = ITEMCATEGORY
        self.ITEMIMAGE = ITEMIMAGE
        self.ITEMPRICE = ITEMPRICE
        self.ITEMQUANTITY = ITEMQUANTITY
        self.ITEMSTATUS = ITEMSTATUS
        
    

    def __repr__(self):
        return f"Item(ITERID={self.ITERID}, ITEMNAME={self.ITEMNAME}, ITEMDESC={self.ITEMDESC}, ITEMCATEGORY={self.ITEMCATEGORY}, ITEMIMAGE={self.ITEMIMAGE}, ITEMPRICE={self.ITEMPRICE}, ITEMQUANTITY={self.ITEMQUANTITY}, ITEMSTATUS={self.ITEMSTATUS})"
    def list():
        cur = connect().cursor()
        cur.execute("SELECT * FROM item")
        for(itemid, itemname, itemdesc, itemcategory, itemimage, itemprice, itemquantity, itemstatus) in cur:
            print(f"Item ID: {itemid}, Item Name: {itemname}, Item Description: {itemdesc}, Item Category: {itemcategory}, Item Image: {itemimage}, Item Price: {itemprice}, Item Quantity: {itemquantity}, Item Status: {itemstatus}")
        cur.close()

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