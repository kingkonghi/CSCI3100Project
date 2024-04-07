from .database.connection import connect
from django.shortcuts import get_object_or_404
from .models.item import *
def list_item():
        rows = Item.objects.all()
        print(rows)
        return rows
def display_item(name):
        rows = Item.objects.filter(itemName=name)
        print(rows)
        return rows

def add_item(name, description, category, image, price, quantity, status):
        item_count = Item.objects.count()
        item1 = Item(itemID=item_count+1,itemName=name, itemDescription=description, itemcategory=category, itemimage=image, itemprice=price, itemquantity=quantity, itemstatus=status)
        item1.save()
        print("Item added.")

def edit_item(name,quantity):
        item1 = Item.objects.filter(itemName=name).update(itemquantity=quantity)
        return item1

def remove_item(itemID):
        item = get_object_or_404(Item, itemID=itemID)
        item.delete()