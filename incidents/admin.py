from django.contrib import admin
from incidents.models import Incident


class IncidentsAdmin(admin.ModelAdmin):
    fields = ['id', 'title', 'description', 'value', 'value_total', 'ong']
    search_fields = ['id', 'title']

    def get_readonly_fields(self, request, obj=None):
        return self.readonly_fields + ('ong', 'value_total')

admin.site.register(Incident, IncidentsAdmin)

