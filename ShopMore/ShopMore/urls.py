from django.urls import path
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from . import views


 
# Register your models here.

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello, name="hello"),
    path('hello/', views.hello),
    path('login/', views.login),
    path('logout/', views.logout),
    path('register/', views.register),
    path('Edit_info/', views.edit_info),
    path('add_to_favorite/', views.add_to_favorite),
    path('product/', views.product),
    path('cart/', views.cart),
    path('checkout/', views.checkout),
    path('order/', views.order),
    path('test_token/', views.test_token),
    path('test_view/', views.test_view),
]
 