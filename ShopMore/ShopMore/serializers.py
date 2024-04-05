from rest_framework import serializers
from django.contrib.auth.models import User
<<<<<<< HEAD
#from .backend.models.favoritelist import FavoriteList
=======
<<<<<<< HEAD
from .backend.models.favoritelist import FavoriteList
=======
from .backend.models import favoritelist
>>>>>>> 92073c000f0bd3892be7d03eb38cf9ebee218adf
>>>>>>> 26a515bd51d0ddd5e7d5a7efc3cb9e340a54f85f

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

'''class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
<<<<<<< HEAD
        model = FavoriteList
        fields = ['userid', 'itemid']'''
=======
<<<<<<< HEAD
        model = FavoriteList
=======
        model = favoritelist
>>>>>>> 92073c000f0bd3892be7d03eb38cf9ebee218adf
        fields = ['userid', 'itemid']
>>>>>>> 26a515bd51d0ddd5e7d5a7efc3cb9e340a54f85f
