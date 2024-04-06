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
        
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['userID', 'accountType', 'username', 'password', 'email', 'profilePhoto', 'address']
    list_filter = ['accountType']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_user = User.objects.order_by('-userID').first()
        initial['userID'] = last_user.userID + 1 if last_user else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.userID:
            last_user = User.objects.order_by('-userID').first()
            obj.userID = last_user.userID + 1 if last_user else 1
        super().save_model(request, obj, form, change)
            
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['orderID', 'userID', 'orderDate', 'orderStatus', 'orderItems', 'orderTotal']
    list_filter = ['orderStatus']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_order = Order.objects.order_by('-orderID').first()
        initial['orderID'] = last_order.orderID + 1 if last_order else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.orderID:
            last_order = Order.objects.order_by('-orderID').first()
            obj.orderID = last_order.orderID + 1 if last_order else 1
        super().save_model(request, obj, form, change)

admin.site.register(FavoriteList)

@admin.register(cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['cartID', 'userID', 'itemlist']
    list_filter = ['userID']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_cart = cart.objects.order_by('-cartID').first()
        initial['cartID'] = last_cart.cartID + 1 if last_cart else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.cartID:
            last_cart = cart.objects.order_by('-cartID').first()
            obj.cartID = last_cart.cartID + 1 if last_cart else 1
        super().save_model(request, obj, form, change)