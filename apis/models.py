from django.db import models


class Test(models.Model):
    datetime = models.DateTimeField(null=False, auto_now=True)
    description = models.CharField(max_length=100)
