from .models.user import *

def list_user():
    rows = User.objects.all()
    print(rows)
    return rows

def add_user(user):
    user_count = User.objects.count()
    user1 = User(userID=user_count+1,username=user.username, accountType=user.accountType, password=user.password, email=user.email, profilePhoto=user.profilePhoto, address=user.address)
    user1.save()
    print(f"User {user.username} added.")

def edit_user(user):
    User.objects.filter(userID=user.userID).update(username=user.username, accountType=user.accountType, password=user.password, email=user.email, profilePhoto=user.profilePhoto, address=user.address)
    
def delete_user(userID):
    User.objects.filter(userID=userID).delete()
    print("User deleted.")