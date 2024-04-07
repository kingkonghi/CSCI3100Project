from .models.cart import *

def list_cart(userid):
        rows = cart.objects.filter(userID=userid).all()
        return rows
    
def add_item_to_cart(userID, itemlist):
        cart1 = cart(userID=userID,itemlist=itemlist)
        cart1.save()
        print("Item added to cart.")
    
def remove_item_from_cart(userid):
        cart.objects.filter(userID=userid).delete()