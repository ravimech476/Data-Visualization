from .models import *

from rest_framework import serializers

class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model=Movies
        fields='__all__'