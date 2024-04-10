from django.contrib import admin
from .backend.models.item import Item
from .backend.models.order import Order
from .backend.models.cart import cart
from .backend.models.review import Review
from .backend.models.favoritelist import FavoriteList
from .backend.models.user import User as UserList
from django.contrib.auth.models import User

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'orderID', 'itemID', 'userID', 'Review', 'Rating']
    list_filter = ['id', 'itemID', 'userID', 'Rating']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_review = Review.objects.order_by('-id').first()
        initial['id'] = last_review.id + 1 if last_review else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.id:
            last_review = Review.objects.order_by('-id').first()
            obj.id = last_review.id + 1 if last_review else 1
        super().save_model(request, obj, form, change)

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
        
@admin.register(UserList)
class UserListAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'accountType', 'username', 'password', 'email', 'profilePhoto', 'address', 'phoneNo']
    list_filter = ['accountType']

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        last_user = UserList.objects.order_by('-user_id').first()
        initial['user_id'] = last_user.user_id + 1 if last_user else 1
        return initial

    def save_model(self, request, obj, form, change):
        if not obj.user_id:
            last_user = UserList.objects.order_by('-user_id').first()
            obj.user_id = last_user.user_id + 1 if last_user else 1
        super().save_model(request, obj, form, change)

        try: #when edit/create user in table userlist through admin, auth_user will also be edited/created 
            auth_user = User.objects.get(id=obj.user_id)
        except User.DoesNotExist:
            auth_user = User(id=obj.user_id)
        auth_user.username = obj.username
        auth_user.set_password(obj.password)
        auth_user.email = obj.email
        auth_user.save()
            
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