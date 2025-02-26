from rest_framework import serializers
from .models import GamificationProfile, Reward

class GamificationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamificationProfile
        fields = ['points', 'streak_days', 'badges_earned']

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'
