from rest_framework import serializers
from django.contrib.auth.models import User
<<<<<<< HEAD
from .backend.models.favoritelist import FavoriteList
=======
from .backend.models import favoritelist
>>>>>>> 92073c000f0bd3892be7d03eb38cf9ebee218adf

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
<<<<<<< HEAD
        model = FavoriteList
=======
        model = favoritelist
>>>>>>> 92073c000f0bd3892be7d03eb38cf9ebee218adf
        fields = ['userid', 'itemid']