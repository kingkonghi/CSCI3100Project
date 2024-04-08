from rest_framework import serializers
from django.contrib.auth.models import User
from .backend.models.favoritelist import FavoriteList
from .backend.models.item import Item
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteList
        fields = ['userid', 'itemid']

class ItemSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Item
        fields = ['itemID', 'itemName', 'itemDescription', 'itemCategory', 'itemImage','itemPrice','itemQuantity','itemStatus']
        