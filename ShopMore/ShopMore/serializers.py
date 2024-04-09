from rest_framework import serializers
from django.contrib.auth.models import User
from .backend.models.favoritelist import FavoriteList
from .backend.models.item import Item
from .backend.models.user import User as UserList
from .backend.models.review import Review
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

class UserListSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = UserList
        fields = ['user_id', 'accountType', 'username', 'password', 'email', 'profilePhoto', 'address']

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