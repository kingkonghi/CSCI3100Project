from django.db import models

class Item(models.Model):
    
    itemID = models.AutoField(primary_key=True)
    itemName = models.CharField(max_length=20)
    itemdesc = models.CharField(max_length=100)
    itemcategory = models.IntegerField()
    itemimage = models.CharField(max_length=100)
    itemprice = models.FloatField()
    itemquantity = models.IntegerField()
    itemstatus = models.IntegerField()

    def __repr__(self):
        return f"Item(ITERID={self.ITERID}, ITEMNAME={self.ITEMNAME}, ITEMDESC={self.ITEMDESC}, ITEMCATEGORY={self.ITEMCATEGORY}, ITEMIMAGE={self.ITEMIMAGE}, ITEMPRICE={self.ITEMPRICE}, ITEMQUANTITY={self.ITEMQUANTITY}, ITEMSTATUS={self.ITEMSTATUS})"

    class Meta:
        db_table = 'item'