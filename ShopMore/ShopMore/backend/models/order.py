from django.db import models
class Order(models.Model):  
    
    orderID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    orderDate = models.DateTimeField()
    orderStatus = models.IntegerField()
    orderItems = models.JSONField()
    orderTotal = models.IntegerField()

    def __repr__(self):
        return f"order(orderID={self.orderID}, userID={self.userID}, orderDate={self.orderDate}, orderStatus={self.orderStatus}, orderTotal={self.orderTotal}, orderItems={self.orderItems})"
    def __str__(self):
        return f"{self.orderID}"
    class Meta:
        db_table = 'orderlist'