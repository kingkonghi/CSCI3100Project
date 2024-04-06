from django.db import models

class FavoriteList(models.Model):
    favouriteID = models.AutoField(primary_key=True)
    userid = models.IntegerField()
    itemid = models.IntegerField()  

    def __repr__(self):
        return f'FavoriteList(favouriteID={self.favouriteID}, user={self.userid}, item={self.itemid})'

    def __str__(self):
        return f"{self.favouriteID}"
    class Meta:
        db_table = 'favouritelist' # Optional: Define the database table name explicitly
