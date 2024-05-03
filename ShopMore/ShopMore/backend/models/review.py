from django.db import models

# Define a Django model named 'Review'
class Review(models.Model):  
    id = models.AutoField(primary_key=True)
    orderID = models.IntegerField()
    userID = models.IntegerField()
    itemID = models.IntegerField()
    Review = models.CharField(max_length=200)
    Rating = models.IntegerField()

    # Define the string representation of the model
    def __str__(self):
        return f"{self.orderID}"
    
    class Meta:
        db_table = 'reviewlist'