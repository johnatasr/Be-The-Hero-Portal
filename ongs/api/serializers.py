from rest_framework import serializers
from ongs.models import Ong

# Register your serializers here.
class OngsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ong
        fields = "__all__"
        depth = 1

