from django.db import models


# Define a Django model named 'cart'
class cart(models.Model):
    cartID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    itemlist = models.JSONField()
    # Define the string representation of the model
    def __str__(self):
        return f"{self.cartID}"
    class Meta:
        db_table = 'cart' # Optional: Define the database table name explicitly
