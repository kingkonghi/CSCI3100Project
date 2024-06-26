from django.db import models

# Define a Django model named 'Item'
class Item(models.Model):
    
    itemID = models.AutoField(primary_key=True)
    itemName = models.CharField(max_length=20)
    itemDescription = models.CharField(max_length=300)
    itemCategory = models.CharField(max_length=50)
    itemImage = models.CharField(max_length=100)
    itemPrice = models.FloatField()
    itemQuantity = models.IntegerField()
    itemStatus = models.IntegerField()

    # Define the string representation of the model
    def __repr__(self):
        return f"Item(ITERID={self.itemID}, ITEMNAME={self.itemName}, ITEMDESC={self.itemDescription}, ITEMCATEGORY={self.itemCategory}, ITEMIMAGE={self.itemImage}, ITEMPRICE={self.itemPrice}, ITEMQUANTITY={self.itemQuantity}, ITEMSTATUS={self.itemStatus})"

    # Define the string representation of the model
    def __str__(self):
        return f"{self.itemName}"
    class Meta:
        db_table = 'item'