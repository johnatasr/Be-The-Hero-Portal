from django.contrib import admin
from ongs.models import Ong

class OngsAdmin(admin.ModelAdmin):
    fields = ['id', 'name', 'email', 'whatsapp', 'city', 'uf', 'user']
    search_fields = ['id', 'name']

    def get_readonly_fields(self, request, obj=None):
        return self.readonly_fields + ('id', 'user')

admin.site.register(Ong, OngsAdmin)