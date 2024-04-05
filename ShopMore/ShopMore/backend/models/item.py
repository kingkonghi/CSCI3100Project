from django.db import models

class Item(models.Model):
    
    itemID = models.AutoField(primary_key=True)
    itemName = models.CharField(max_length=20)
    itemDescription = models.CharField(max_length=100)
    itemcategory = models.IntegerField()
    itemimage = models.CharField(max_length=100)
    itemprice = models.FloatField()
    itemquantity = models.IntegerField()
    itemstatus = models.IntegerField()

    def __repr__(self):
        return f"Item(ITERID={self.itemID}, ITEMNAME={self.itemName}, ITEMDESC={self.itemDescription}, ITEMCATEGORY={self.itemcategory}, ITEMIMAGE={self.itemimage}, ITEMPRICE={self.itemprice}, ITEMQUANTITY={self.itemquantity}, ITEMSTATUS={self.itemstatus})"

    class Meta:
        db_table = 'item'