from .models.review import *
from .models.order import *
def list_review(itemID):
        rows = Review.objects.filter(itemID=itemID).all()
        reviews = ''
        return rows

def add_review(userID,itemID,Reviewadd,Rating):
        rows = Order.objects.get(userID=userID).orderItems.get(str(itemID))
        #review/add/<itemID>/<userID>/<Review>/<Rating>/
        if rows != None:
                orderID = Order.objects.get(userID=userID).pk
                id_count=Review.objects.count()
                Review.objects.create(id=id_count+1,orderID=int(orderID),itemID=int(itemID),userID=int(userID),Review=Reviewadd,Rating=int(Rating))
                return "Review added."
        else:
                return "You have not purchased this item."
    
def edit_review(itemID, userID,Reviewedit,Rating):
        Review.objects.filter(itemID=itemID,userID=userID).update(Review=Reviewedit,Rating=Rating)

def delete_review(itemID,userID):
        Review.objects.filter(itemID=itemID,userID=userID).delete()