from rest_framework import serializers
from .models import Aparts


class ApartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aparts
        fields = ('address','floor','floor_amount', 'rooms', 'metres', 'kitchen','repair','metro','time_to_metro','year_house')