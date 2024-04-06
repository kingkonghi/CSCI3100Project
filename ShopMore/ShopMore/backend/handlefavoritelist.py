from django.shortcuts import get_object_or_404
from ShopMore.serializers import FavoriteListSerializer
from .models.favoritelist import FavoriteList
from .models.item import Item

def add_favorite(user_id, item_id):
    item = get_object_or_404(Item, itemID=item_id)
    favorite_item, created =  FavoriteList.objects.get_or_create(userid=user_id, itemid=item_id)
    if created:
        return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} IS created"
    return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} ALREADY exist"

def delete_favorite_item(favorite_item):
    favorite_item = get_object_or_404(FavoriteList, favouriteID = favorite_item)
    favorite_item.delete()
    return f"delete favorite item {favorite_item.favouriteID} with item id : {favorite_item.itemid} from user {favorite_item.userid} successfully"

def get_favorite_list(user_id):
    favorite_items = FavoriteList.objects.filter(userid = user_id)
    serialized_items = FavoriteListSerializer(favorite_items, many = True)
    return serialized_items.data
    
