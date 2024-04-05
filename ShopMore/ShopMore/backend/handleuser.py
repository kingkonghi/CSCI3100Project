from .database.connection import connect
from django.db import models

conn = connect()

def add_user(user):
    cur = conn.cursor()
    cur.execute("INSERT INTO userlist (username, accountType, password, email, profilePhoto, address) VALUES (?, ?, ?, ?, ?, ?)", (user.username, user.accountType, user.password, user.email, user.profilePhoto, user.address))
    conn.commit()
    print("User added to database.")
    cur.close()
    
def edit_user(user):
    cur = conn.cursor()
    cur.execute("UPDATE userlist SET username = ?, accountType = ?, password = ?, email = ?, profilePhoto = ?, address = ? WHERE userID = ?", (user.username, user.accountType, user.password, user.email, user.profilePhoto, user.address, user.userID))
    conn.commit()
    print("User updated.")
    cur.close()
    
def delete_user(username):
    cur = conn.cursor()
    cur.execute("DELETE FROM userlist WHERE username = ?", (username))
    conn.commit()
    print("User deleted from database.")
    cur.close()