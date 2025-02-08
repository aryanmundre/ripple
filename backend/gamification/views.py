from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class GamificationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "points": user.points,
            "streak_days": user.streak_days,
            "badges_earned": user.badges_earned,
        }
        return Response(data)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Reward, GamificationProfile
from .serializers import GamificationDataSerializer, RewardSerializer

CustomUser = get_user_model()

class GamificationDataView(APIView):
    """
    API to fetch gamification data and available rewards.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        gamification_profile = request.user.gamification
        gamification_profile.update_streak()  # Update streak if applicable
        serializer = GamificationDataSerializer(gamification_profile)

        # Fetch available rewards
        rewards = Reward.objects.filter(
            points_required__lte=gamification_profile.points,
            streak_days_required__lte=gamification_profile.streak_days
        ).exclude(badge_required__isnull=False).exclude(badge_required__in=gamification_profile.badges_earned)

        reward_serializer = RewardSerializer(rewards, many=True)
        
        return Response({
            "gamification_data": serializer.data,
            "available_rewards": reward_serializer.data
        }, status=status.HTTP_200_OK)

class AwardPointsView(APIView):
    """
    API to award points and update streaks when a user completes an action.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        gamification_profile = user.gamification

        points_earned = 10  # Set points per action
        gamification_profile.add_points(points_earned)
        gamification_profile.update_streak()

        return Response({
            "message": f"{points_earned} points awarded!",
            "total_points": gamification_profile.points,
            "streak_days": gamification_profile.streak_days
        }, status=status.HTTP_200_OK)
