from rest_framework import serializers
from django.contrib.auth.models import User
#from .backend.models.favoritelist import FavoriteList

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

'''class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteList
        fields = ['userid', 'itemid']'''
