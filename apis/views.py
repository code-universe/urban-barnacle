from django.shortcuts import render

from django.shortcuts import render

from rest_framework import viewsets
from apis.serializers import TestSerializer
from apis.models import Test

# Create your views here.
class TestViewSet(viewsets.ModelViewSet):
    """
    Test endpoint
    """

    queryset = Test.objects.all().order_by("-datetime")
    serializer_class = TestSerializer
