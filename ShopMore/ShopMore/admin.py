from django.contrib import admin
from .backend.models.item import Item
from .backend.models.order import Order
from .backend.models.cart import cart
from .backend.models.favoritelist import FavoriteList
from .backend.models.user import User

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ['itemID', 'itemName', 'itemDescription', 'itemCategory', 'itemImage', 'itemPrice', 'itemQuantity', 'itemStatus']
    list_filter = ['itemCategory', 'itemStatus']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_item = Item.objects.order_by('-itemID').first()
        initial['itemID'] = last_item.itemID + 1 if last_item else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.itemID:  # new object is being created
            last_item = Item.objects.order_by('-itemID').first()
            obj.itemID = last_item.itemID + 1 if last_item else 1
        super().save_model(request, obj, form, change)

admin.site.register(User)
admin.site.register(Order)
admin.site.register(FavoriteList)
admin.site.register(cart)
