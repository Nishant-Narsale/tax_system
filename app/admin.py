from django.contrib import admin
from .models import Payer, Accountant

admin.site.register(Payer)
admin.site.register(Accountant)