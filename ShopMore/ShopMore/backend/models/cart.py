from django.db import models


class cart(models.Model):
    cartID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    itemID = models.JSONField()
    quantity = models.JSONField()
        
    def __repr__(self):
        return f"cart(cardID={self.cartID}, userid={self.userID}, itemid={self.itemID}, quantity={self.quantity})"
    
    class Meta:
        db_table = 'cart' # Optional: Define the database table name explicitly
