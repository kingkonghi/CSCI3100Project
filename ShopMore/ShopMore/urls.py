from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from . import views
from .backend.models.order import Order
from .backend.models.cart import cart
from .backend.models.favoritelist import FavoriteList
from .backend.models.item import Item
from .backend.models.user import User

 
# Register your models here.

admin.site.register(User)
admin.site.register(Order)
admin.site.register(Item)
admin.site.register(FavoriteList)
admin.site.register(cart)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello, name="hello"),
    path('hello/', views.hello),
    path('login/', views.login),
    path('logout/', views.logout),
    path('test_token/', views.test_token),
    path('register/', views.register),
    path('Edit_info/', views.edit_info),
    path('product/', views.product),
    path('cart/', views.cart),
    path('checkout/', views.checkout),
    path('order/', views.order),
]
 