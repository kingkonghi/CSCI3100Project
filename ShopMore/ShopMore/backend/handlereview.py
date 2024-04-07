from .database.connection import connect
from .models.review import *
conn=connect()

def list_review(itemID):
        rows = Review.objects.filter(itemID=itemID).all()
        print(rows)
        return rows

def add_order(orderID,userID,itemID,Reviewadd,Rating):
        review1 = Review(orderID = orderID,userID=userID,itemID=itemID,Review=Reviewadd,Rating=Rating)
        review1.save()
        print("Review added.")

    
def edit_review(itemID, userID,Reviewedit):
        Review.objects.filter(itemID=itemID,userID=userID).update(Review=Reviewedit)

def delete_review(itemID,userID):
        Review.objects.filter(itemID=itemID,userID=userID).delete()