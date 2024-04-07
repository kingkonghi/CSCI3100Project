from django.urls import path, include
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
    path('product/', views.product, ),
    path('cart/', views.cart),
    path('order/', views.order),
    path('checkout/', views.payment_checkout, name='checkout_payment'),
    path('create_payment/', views.create_payment, name='create_payment'),
    path('execute_payment/', views.execute_payment, name='execute_payment'),
    path('test_token/', views.test_token),
    path('test_view/', views.test_view),
]
 