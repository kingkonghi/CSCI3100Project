from django.contrib.auth.models import User
from django.contrib import admin
from .models.item import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ['itemID', 'itemName', 'itemDescription', 'itemCategory', 'itemImage', 'itemPrice', 'itemQuantity', 'itemStatus']
    list_filter = ['itemCategory', 'itemStatus']

admin.site.register(Item, ItemAdmin)