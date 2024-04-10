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
    path('display_favorite/', views.display_favorite),
    path('product/recommendation/', views.recommendation),
    path('product/', views.product, name='product'),
    path('product/<itemID>/',views.product_specific,name='product_specific'),
    path('cart/<userID>/', views.cart_list),
    path('cart/add/<userID>/<itemID>/<quantity>/', views.cart_add),
    path('cart/edit/<userID>/<itemID>/<quantity>/', views.cart_edit),
    path('cart/remove/<userID>/<itemID>/', views.cart_remove),
    path('order/<orderID>/', views.order),
    path('order/add/<userID>/<str:orderItems>/<total>/', views.order_add),
    path('order/remove/<orderID>/', views.order_delete),
    path('checkout/', views.payment_checkout, name='checkout_payment'),
    path('create_payment/', views.create_payment, name='create_payment'),
    path('execute_payment/', views.execute_payment, name='execute_payment'),
    path('test_token/', views.test_token),
    path('test_view/', views.test_view),
    path('review/', views.review),
    path('review/<itemID>/', views.review_specific),
    path('review/add/<itemID>/<userID>/<Review>/<Rating>/', views.review_add),
    path('review/remove/<itemID>/<userID>/', views.review_remove),
    path('Admin/item/display/', views.admin_display_item),
    path('Admin/item/add/', views.admin_add_item),
    path('Admin/item/edit/<int:pk>/', views.admin_edit_item),
    path('Admin/item/delete/<int:pk>/', views.admin_delete_item),
    path('Admin/user/display/', views.admin_display_user),
    path('Admin/user/add/', views.admin_add_user),
    path('Admin/user/edit/<int:pk>/', views.admin_edit_user),
    path('Admin/user/delete/<int:pk>/', views.admin_delete_user),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
 