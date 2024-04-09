from django.urls import path, include, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from . import views
from django.conf import settings
from django.conf.urls.static import static
 
# Register your models here.
__all__ = ['handler400', 'handler403', 'handler404', 'handler500', 'include', 'url']
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.hello, name="hello"),
    path('hello/', views.hello),
    path('login/', views.login),
    path('logout/', views.logout),
    path('register/', views.register),
    path('user/', views.user),
    path('user/edit_info/', views.edit_info),
    path('add_to_favorite/', views.add_to_favorite),
    path('product/recommendation/', views.recommendation),
    path('product/', views.product, name='product'),
    path('product/<itemID>/',views.product_specific,name='product_specific'),
    path('cart/', views.cart),
    path('order/', views.order),
    path('checkout/', views.payment_checkout, name='checkout_payment'),
    path('create_payment/', views.create_payment, name='create_payment'),
    path('execute_payment/', views.execute_payment, name='execute_payment'),
    path('test_token/', views.test_token),
    path('test_view/', views.test_view),
    path('Admin/user/display/', views.admin_display_user),
    path('Admin/user/add/', views.admin_add_user),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
 