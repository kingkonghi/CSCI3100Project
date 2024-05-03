from django.db import models

# Define a Django model named 'FavoriteList'
class FavoriteList(models.Model):
    favouriteID = models.AutoField(primary_key=True)
    userid = models.IntegerField()
    itemid = models.IntegerField()  

    # Define the string representation of the model
    def __repr__(self):
        return f'FavoriteList(favouriteID={self.favouriteID}, user={self.userid}, item={self.itemid})'

    # Define the string representation of the model
    def __str__(self):
        return f"{self.favouriteID}"
    class Meta:
        db_table = 'favouritelist' # Optional: Define the database table name explicitly
