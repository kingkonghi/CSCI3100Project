from .models.cart import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from ShopMore.serializers import CartSerializer

# List all items in the cart of a user
def list_cart(userID):
        cartlist = []
        for i in cart.objects.filter(userID=userID).all():
                item = get_object_or_404(cart, userID=userID)
                serializer = CartSerializer(instance=item)
                cartlist.append(serializer.data)
        return cartlist

# Add an item to the cart of a user
def add_item_to_cart(userID, itemID, quantity):
        try:
                if not cart.objects.filter(userID=userID).exists():
                        cart.objects.create(userID=userID, itemlist={str(itemID): int(quantity)})
                else:
                        cart1 = cart.objects.get(userID=userID)
                        if str(itemID) in cart1.itemlist.keys():
                                cart1.itemlist[str(itemID)] += int(quantity)
                        else:
                                cart1.itemlist[str(itemID)] = int(quantity) # Add the item
                        cart1.save()
                return ""
        except Exception as e:
                return e

# Edit an item quantity in the cart of a user
def edit_item(userID, itemID, quantity): 
        try:   
                if cart.objects.filter(userID=userID).exists():
                        cart1 = cart.objects.get(userID=userID)
                        cart1.itemlist[str(itemID)] = int(quantity) # Change the item
                        cart1.save()
                return ""
        except Exception as e:
                return e

# Remove an item from the cart of a user
def remove_item(userID,itemID):
        try:   
                if cart.objects.filter(userID=userID).exists():
                        cart1 = cart.objects.get(userID=userID)
                        del cart1.itemlist[str(itemID)] # Delete the item
                        cart1.save()
                return ""
        except Exception as e:
                return e

# Remove all items from the cart of a user
def remove_all_items(userID):
        if cart.objects.filter(userID=userID).exists():
                cart_items = cart.objects.filter(userID=userID)
                cart_items.delete()