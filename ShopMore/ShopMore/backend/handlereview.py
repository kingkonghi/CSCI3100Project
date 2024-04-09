from .models.review import *
from .models.order import *
from ShopMore.serializers import ReviewSerializer
from django.shortcuts import get_object_or_404
def list_review():
        reviewlist = []
        for i in Review.objects.all():
                item = get_object_or_404(Review, id=i.id)
                serializer = ReviewSerializer(instance=item)
                reviewlist.append(serializer.data)
        return reviewlist
def list_review_specific(itemID):
        reviewlist = []
        for i in Review.objects.filter(itemID=itemID).all():
                item = get_object_or_404(Review, id=i.id)
                serializer = ReviewSerializer(instance=item)
                reviewlist.append(serializer.data)
        return reviewlist

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