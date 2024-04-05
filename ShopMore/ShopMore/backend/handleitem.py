from .database.connection import connect
from .models.item import *
conn = connect()

def list_item():
        rows = Item.objects.all()
        print(rows)
        return rows

def add_item(name, description, category, image, price, quantity, status):
        item_count = Item.objects.count()
        item1 = Item(itemID=item_count+1,itemName=name, itemDescription=description, itemcategory=category, itemimage=image, itemprice=price, itemquantity=quantity, itemstatus=status)
        item1.save()
        print("Item added.")

def edit_item(name,quantity):
        cur = connect().cursor()
        cur.execute(f"UPDATE item SET QUANTITY = {quantity} WHERE NAME = '{name}'")
        connect().commit()
        print("Item quantity updated.")
        cur.close()

def remove_item(ID):
        Item.objects.filter(itemID=ID).delete()