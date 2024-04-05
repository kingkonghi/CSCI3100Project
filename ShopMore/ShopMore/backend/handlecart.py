from .models.cart import *

def list_cart():
        rows = cart.objects.all()
        print(rows)
        return rows
    
def add_item_to_cart(itemid, quantity, userid):
        cart1 = cart(itemID=itemid, quantity=quantity, userID=userid)
        cart1.save()
        print("Item added to cart.")
    
def remove_item_from_cart(userid):
        cart.objects.filter(userID=userid).delete()