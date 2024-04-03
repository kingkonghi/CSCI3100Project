from django.http import HttpResponse
 
def hello(request):
    return HttpResponse("Hello world ! ")

def login(request):
    return HttpResponse("Login page")

def register(request):
    return HttpResponse("Register page")

def product(request):
    return HttpResponse("Product page")

def cart(request):
    return HttpResponse("Cart page")

def checkout(request):
    return HttpResponse("Checkout page")

def order(request):
    return HttpResponse("Order page")