from .database.connection import connect
from .models.user import *

conn = connect()

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
    cur = conn.cursor()
    cur.execute("UPDATE userlist SET username = ?, accountType = ?, password = ?, email = ?, profilePhoto = ?, address = ? WHERE userID = ?", (user.username, user.accountType, user.password, user.email, user.profilePhoto, user.address, user.userID))
    conn.commit()
    print("User updated.")
    cur.close()
    
def delete_user(userID):
    User.objects.filter(userID=userID).delete()
    print("User deleted.")