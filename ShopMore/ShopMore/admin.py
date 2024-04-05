from django.contrib.auth.models import User
from django.contrib import admin
from backend.models.item import Item

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['itemID', 'itemName', 'itemDescription', 'itemCategory', 'itemImage', 'itemPrice', 'itemQuantity', 'itemStatus']
    list_filter = ['itemCategory', 'itemStatus']

admin.site.register(Item, ItemAdmin)