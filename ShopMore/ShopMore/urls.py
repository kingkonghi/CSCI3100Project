from django.urls import path
from django.views.generic import TemplateView
from . import views
 
urlpatterns = [
    path('', views.hello, name="hello"),
    path('hello/', views.hello),
    path('login/', views.login),
    path('test_token/', views.test_token),
    path('register/', views.register),
    path('product/', views.product),
    path('cart/', views.cart),
    path('checkout/', views.checkout),
    path('order/', views.order),
]
 