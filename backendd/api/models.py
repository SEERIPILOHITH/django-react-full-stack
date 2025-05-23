from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title= models.CharField(max_length=100)
    content = models.TextField()
    created_At =models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='note')
# Create your models here.
    def __str__(self):
        return self.title