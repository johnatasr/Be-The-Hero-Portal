from rest_framework import serializers
from incidents.models import Incident

# Register your serializers here.
class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = "__all__"
        depth = 1


