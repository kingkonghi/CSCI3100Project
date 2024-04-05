from django.db import models


class cart(models.Model):
    userid = models.IntegerField()
    itemid = models.JSONField()
    quantity = models.JSONField()
        
    def __repr__(self):
        return f"cart(userid={self.userid}, itemid={self.itemid}, quantity={self.quantity})"
    
    class Meta:
        db_table = 'cart' # Optional: Define the database table name explicitly
