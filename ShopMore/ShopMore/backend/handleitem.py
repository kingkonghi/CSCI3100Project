from .database.connection import connect
from django.shortcuts import get_object_or_404
from .models.item import *

# List all items
def list_item():
        #Step 1: get all items
        rows = Item.objects.all()
        #Step 2: return the items
        return rows
# Display an item
def display_item(name):
        #Step 1: get the item by name
        rows = Item.objects.filter(itemName=name)
        #Step 2: return the item
        return rows
# Add an item
def add_item(name, description, category, image, price, quantity, status):
        #Step 1: get the number of items
        item_count = Item.objects.count()
        #Step 2: create a new item and assign the itemID
        item1 = Item(itemID=item_count+1,itemName=name, itemDescription=description, itemCategory=category, itemImage=image, itemPrice=price, itemQuantity=quantity, itemStatus=status)
        item1.save()
        #Step 3: return the added message
        return f"Item added"
# Edit an item
def edit_item(name,quantity):
        #Step 1: get the item by name and update the quantity
        item1 = Item.objects.filter(itemName=name).update(itemquantity=quantity)
        #Step 2: return the updated item
        return item1
# Delete an item
def delete_item(itemID):
        #Step 1: get the item by itemID
        item = get_object_or_404(Item, itemID=itemID)
        #Step 2: delete the item
        item.delete()
        #Step 3: return deleted message
        return f"removed item: {itemID}"