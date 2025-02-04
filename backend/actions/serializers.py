from rest_framework import serializers
from .models import Action
from .models import UserAction

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'name','organization','description', 'category', 'created_at']

class UserActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAction
        fields = ['id', 'user', 'action', 'interaction_type', 'interacted_at']
