from django.shortcuts import get_object_or_404
from ShopMore.serializers import FavoriteListSerializer
from .models.favoritelist import FavoriteList
from .models.item import Item

# Add an item to the favorite list
def add_favorite(user_id, item_id):
    #Step 1: check if the item is already in the favorite list
    favorite_item, created =  FavoriteList.objects.get_or_create(userid=user_id, itemid=item_id)
    if created:
        #Step 2: if the item is not in the favorite list, return created message
        return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} IS created"
    #Step 3: if the item is already in the favorite list, return existed message
    return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} ALREADY exist"

# Delete an item from the favorite list
def delete_favorite_item(favorite_item):
    #Step 1: get the favorite item
    favorite_item = get_object_or_404(FavoriteList, favouriteID = favorite_item)
    #Step 2: delete the favorite item
    favorite_item.delete()
    #Step 3: return the deleted message
    return f"delete favorite item  {favorite_item.itemid} from user {favorite_item.userid} successfully"

# Get the favorite list of a user
def get_favorite_list(user_id):
    #Step 1: get all items in the favorite list of the user
    favorite_items = FavoriteList.objects.filter(userid = user_id)
    serialized_items = []
    #Step 2: serialize the items
    for index, item in enumerate(favorite_items):
        #Step 3: get the item data and serialize the item
        item_data = Item.objects.get(itemID=item.itemid)
        serialized_item = {
            'userid': item.userid,
            'itemid': item.itemid,
            'itemName': item_data.itemName,
            'itemPrice': item_data.itemPrice,
            'itemImage': item_data.itemImage
        }
        #Step 4: append the serialized item to the serialized item list
        serialized_items.append(serialized_item)
    #Step 5: return the serialized item list
    return serialized_items
    
