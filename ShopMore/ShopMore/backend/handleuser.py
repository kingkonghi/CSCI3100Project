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


def edit_user(user, username=None, accountType=None, password=None, email=None, profilePhoto=None, address=None):
    user_list_data = {}
    auth_user_data = {}

    if username is not None:
        user_list_data['username'] = username
        auth_user_data['username'] = username

    if accountType is not None:
        user_list_data['accountType'] = accountType

    if password is not None:
        user_list_data['password'] = password
        auth_user_data['password'] = password

    if email is not None:
        user_list_data['email'] = email
        auth_user_data['email'] = email

    if profilePhoto is not None:
        user_list_data['profilePhoto'] = profilePhoto

    if address is not None:
        user_list_data['address'] = address

    UserList.objects.filter(user_id=user.id).update(**user_list_data)

    auth_user = User.objects.get(id=user.id)
    for key, value in auth_user_data.items():
        setattr(auth_user, key, value)
    auth_user.save()

    return f"edited"


def delete_user(userID):
    UserList.objects.filter(user_id=userID).delete()
    FavoriteList.objects.filter(userid=userID).delete()
    cart.objects.filter(userID=userID).delete()
    print("User deleted.")