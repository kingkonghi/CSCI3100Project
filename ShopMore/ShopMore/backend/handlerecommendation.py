from .models.favoritelist import FavoriteList
from .models.order import Order
from.models.item import Item
from django.db.models import Q
import json


def generate_recommendation(user):
    # Step 1: Retrieve favorite items for the logged-in user
    favorite_items = FavoriteList.objects.filter(userid=user.id).values_list('itemid', flat=True)

    # Step 2: Retrieve order items for the logged-in user
    order_items = Order.objects.filter(userID=user.id).values_list('orderItems', flat=True)

    item_ids = list(favorite_items) + [int(item_id) for order in order_items for item_id in order.values()]

    # Step 4: Retrieve item categories associated with the item IDs
    item_categories = Item.objects.filter(itemID__in=item_ids).values_list('itemCategory', flat=True)

    extracted_categories = [category.split(',')[0] for category in item_categories]

    # Step 5: Retrieve items with the same item category as the extracted categories
    recommended_items = Item.objects.filter(
        Q(itemCategory__in=extracted_categories) & ~Q(itemID__in=item_ids)
    )

    return recommended_items

