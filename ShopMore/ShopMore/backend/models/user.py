from django.db import models
from django.contrib.auth.models import User as AuthUser

class User(models.Model):
    
    user = models.OneToOneField(AuthUser,on_delete=models.CASCADE, primary_key=True)
    accountType = models.IntegerField(null=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    profilePhoto = models.CharField(max_length=100, null=True)
    address = models.CharField(max_length=100, null=True)

    def __repr__(self):
        return f"User(UID={self.user}, ACCOUNTTYPE={self.accountType}, UNAME={self.username}, UPASSWORD={self.password}, EMAILL={self.email}, PROFILEPHOT={self.profilePhoto}, ADDRESS={self.address})"
    def __str__(self):
        return f"{self.username}"
    class Meta:
        db_table = 'userlist'