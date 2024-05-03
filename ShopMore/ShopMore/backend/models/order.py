from django.db import models

# Define a Django model named 'Order'
class Order(models.Model):  
    
    orderID = models.AutoField(primary_key=True)
    userID = models.IntegerField()
    orderDate = models.DateField()
    orderStatus = models.IntegerField()
    orderItems = models.JSONField()
    orderTotal = models.IntegerField()
    address = models.CharField(max_length=100)
    
    # Define the string representation of the model
    def __repr__(self):
        return f"order(orderID={self.orderID}, userID={self.userID}, orderDate={self.orderDate}, orderStatus={self.orderStatus}, orderTotal={self.orderTotal}, orderItems={self.orderItems})"
    # Define the string representation of the model
    def __str__(self):
        return f"{self.orderID}"
    class Meta:
        db_table = 'orderlist'