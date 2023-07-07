from django.db import models
import uuid

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()
    phone_number = models.CharField(max_length=20)
    bmi_value=models.FloatField()
    category=models.CharField(max_length=30,default='Uncategorized')
    refid = models.UUIDField(default=uuid.uuid4, editable=False)

    def __str__(self):
        return self.name
