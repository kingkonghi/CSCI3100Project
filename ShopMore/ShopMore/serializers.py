from rest_framework import serializers
from django.contrib.auth.models import User
from .backend.models import favoritelist

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password', 'email']

class FavoriteListSerializer(serializers.ModelSerializer):
    class Meta:
        model = favoritelist
        fields = ['userid', 'itemid']