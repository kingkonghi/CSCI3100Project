from django.db import models

class FavoriteList(models.Model):
    userid = models.IntegerField()
    itemid = models.IntegerField()  

    def __repr__(self):
        return f'FavoriteList(user={self.userid}, item={self.itemid})'

    class Meta:
        db_table = 'favoritelist' # Optional: Define the database table name explicitly
<<<<<<< HEAD
=======

        
>>>>>>> 92073c000f0bd3892be7d03eb38cf9ebee218adf
