from django.db import models

class User(models.Model):
    
    userID = models.AutoField(primary_key=True)
    accountType = models.IntegerField()
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    profilePhoto = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __repr__(self):
        return f"User(UID={self.userID}, ACCOUNTTYPE={self.ACCOUNTTYPE}, UNAME={self.UNAME}, UPASSWORD={self.UPASSWORD}, EMAILL={self.EMAILL}, PROFILEPHOT={self.PROFILEPHOT}, ADDRESS={self.ADDRESS})"

    class Meta:
        db_table = 'user'