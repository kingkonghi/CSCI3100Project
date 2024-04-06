from django.shortcuts import get_object_or_404
from .models.favoritelist import FavoriteList
from .models.item import Item

def add_favorite(user_id, item_id):
    item = get_object_or_404(Item, itemID=item_id)
    favorite_item, created =  FavoriteList.objects.get_or_create(userid=user_id, itemid=item_id)
    if created:
        return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} IS created"
    return f"favoritelist ID: {favorite_item.favouriteID} which itemid = {favorite_item.itemid} and userid = {favorite_item.userid} ALREADY exist"