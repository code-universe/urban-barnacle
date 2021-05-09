from rest_framework import serializers
from apis.models import Test


class TestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Test
        fields = ["url", "datetime", "description"]
