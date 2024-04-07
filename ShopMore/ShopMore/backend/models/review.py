from django.db import models
class Review(models.Model):  
    
    orderID = models.IntegerField()
    userID = models.IntegerField()
    itemID = models.IntegerField()
    Review = models.CharField(max_length=200)
    Rating = models.IntegerField()


    def __repr__(self):
        return f"order(orderID={self.orderID}, userID={self.userID}, itemID={self.itemID}, Review={self.Review}, Rating={self.Rating})"
    def __str__(self):
        return f"{self.orderID}"
    class Meta:
        db_table = 'reviewlist'