from .models.review import *
from .models.order import *
from ShopMore.serializers import ReviewSerializer
from django.shortcuts import get_object_or_404
#list all reviews
def list_review():
        reviewlist = []
        for i in Review.objects.all():
                item = get_object_or_404(Review, id=i.id)
                serializer = ReviewSerializer(instance=item)
                reviewlist.append(serializer.data)
        return reviewlist
#list all reviews of a specific item
def list_review_specific(itemID):
        reviewlist = []
        for i in Review.objects.filter(itemID=itemID).all():
                item = get_object_or_404(Review, id=i.id)
                serializer = ReviewSerializer(instance=item)
                reviewlist.append(serializer.data)
        return reviewlist

#Add review and rating for an item
def add_review(userID,itemID,Reviewadd,Rating):
        #review/add/<itemID>/<userID>/<Review>/<Rating>/
        orderID = 1
        id_count=Review.objects.count()
        Review.objects.create(id=id_count+1,orderID=int(orderID),itemID=int(itemID),userID=int(userID),Review=Reviewadd,Rating=int(Rating))
        return "Review added."
#Edit review and rating
def edit_review(itemID, userID,Reviewedit,Rating):
        Review.objects.filter(itemID=itemID,userID=userID).update(Review=Reviewedit,Rating=Rating)
#Delete rating and review
def delete_review(itemID,userID):
        Review.objects.filter(itemID=itemID,userID=userID).delete()