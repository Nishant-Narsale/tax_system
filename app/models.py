from django.db import models
from django.contrib.auth.models import User


class Accountant(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
class Payer(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    accountant = models.ForeignKey(Accountant, null=True, blank=True, on_delete=models.CASCADE)
    name = models.TextField(max_length=255, null=False, blank=False)
    
    def __str__(self):
        return self.name