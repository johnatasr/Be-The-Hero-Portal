from django.contrib import admin
from ongs.models import Ong

class OngsAdmin(admin.ModelAdmin):
    fields = ['id', 'name', 'email', 'whatsapp', 'city', 'uf', 'user']
    search_fields = ['id', 'name']

admin.site.register(Ong, OngsAdmin)