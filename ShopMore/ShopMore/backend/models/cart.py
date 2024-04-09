from django.db import models


class cart(models.Model):
    cartID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    itemlist = models.JSONField()
    
    def __str__(self):
        return f"{self.cartID}"
    class Meta:
        db_table = 'cart' # Optional: Define the database table name explicitly
