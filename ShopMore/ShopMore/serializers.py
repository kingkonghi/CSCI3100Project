from rest_framework import serializers
from django.contrib.auth.models import User
from .backend.models.favoritelist import FavoriteList
from .backend.models.item import Item
from .backend.models.user import User as UserList
from .backend.models.review import Review
from .backend.models.cart import cart
from .backend.models.order import Order
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

class UserListSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = UserList
        fields = ['user_id', 'accountType', 'username', 'password', 'email', 'profilePhoto', 'address', 'phoneNo']

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteList
        fields = ['userid', 'itemid']

class ItemSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Item
        fields = ['itemID', 'itemName', 'itemDescription', 'itemCategory', 'itemImage','itemPrice','itemQuantity','itemStatus']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'orderID', 'itemID', 'userID', 'Review', 'Rating']

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = ['userID', 'itemlist']
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['orderID', 'userID', 'orderDate', 'orderStatus', 'orderItems', 'orderTotal', 'address']