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
