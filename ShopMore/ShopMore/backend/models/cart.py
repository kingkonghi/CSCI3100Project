from django.db import models


class cart(models.Model):
    cartID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    itemlist = models.JSONField()
        
    def __repr__(self):
        return f"cart(cardID={self.cartID}, userid={self.userID}, itemlist={self.itemlist})"
    
    class Meta:
        db_table = 'cart' # Optional: Define the database table name explicitly
