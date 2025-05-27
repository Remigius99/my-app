from django.db import models

# Create your models here.
class Order(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    whatsapp = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
