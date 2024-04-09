from .models.cart import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required

def list_cart(userid):
        rows = cart.objects.filter(userID=userid).all()
        out = ""
        for i in rows:
            out = i.itemlist
        return out

def add_item_to_cart(userID, itemID, quantity):
        try:
                if not cart.objects.filter(userID=userID).exists():
                        cart.objects.create(userID=userID, itemlist={str(itemID): int(quantity)})
                else:
                        cart1 = cart.objects.get(userID=userID)
                        cart1.itemlist[str(itemID)] = int(quantity) # Add the item
                        cart1.save()
                return ""
        except Exception as e:
                return e
        
def edit_item(userID, itemID, quantity): 
        try:   
                if cart.objects.filter(userID=userID).exists():
                        cart1 = cart.objects.get(userID=userID)
                        cart1.itemlist[str(itemID)] = int(quantity) # Change the item
                        cart1.save()
                return ""
        except Exception as e:
                return e
        
def remove_item(userID,itemID):
        try:   
                if cart.objects.filter(userID=userID).exists():
                        cart1 = cart.objects.get(userID=userID)
                        del cart1.itemlist[str(itemID)] # Delete the item
                        cart1.save()
                return ""
        except Exception as e:
                return e