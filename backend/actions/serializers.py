from rest_framework import serializers
from .models import Action
from .models import UserAction, Action, TrendingLog, CustomUser
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
class ActionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'

class UserActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAction
        fields = '__all__'

class ActionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'name', 'thubnail', 'organization', 'category', 'type']

class TrendingLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingLog
        fields = '__all__'

class GamificationDataSerializer(serializers.ModelSerializer):
    """
    Serializer to handle gamification data for the user.
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'points', 'streak_days', 'badges_earned', 'ripple_size']