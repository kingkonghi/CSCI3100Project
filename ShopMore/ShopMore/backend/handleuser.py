from .models.user import User as UserList
from .models.favoritelist import *
from .models.cart import *
from django.contrib.auth.models import User

def list_user_info(user):
    user_info = UserList.objects.filter(user_id=user.id)
    return user_info

def add_user(user):
    user_count = UserList.objects.count()
    user1 = UserList(user_id=user_count+1,username=user.username, accountType=user.accountType, password=user.password, email=user.email, profilePhoto=user.profilePhoto, address=user.address)
    user1.save()

    try: #when edit/create user in table userlist through admin, auth_user will also be edited/created 
        auth_user = User.objects.get(id=user1.user_id)
    except User.DoesNotExist:
        auth_user = User(id=user1.user_id)
    auth_user.username = user1.username
    auth_user.set_password(user1.password)
    auth_user.email = user1.email
    auth_user.save()
    print(f"User {user.username} added.")

def edit_user(user):
    UserList.objects.filter(user_id=user.id).update(username=user.username, accountType=user.accountType, password=user.password, email=user.email, profilePhoto=user.profilePhoto, address=user.address)

    auth_user = User.objects.get(id=user.id)
    auth_user.username = user.username
    auth_user.set_password(user.password)
    auth_user.email = user.email
    auth_user.save()


def delete_user(userID):
    UserList.objects.filter(user_id=userID).delete()
    FavoriteList.objects.filter(userid=userID).delete()
    cart.objects.filter(userID=userID).delete()
    print("User deleted.")