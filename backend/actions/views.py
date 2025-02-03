from rest_framework.generics import ListAPIView
from .models import Action
from .serializers import ActionSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import UserAction
from .serializers import UserActionSerializer

class UserActionView(APIView):
    """
    API for creating and retrieving user interactions with actions.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Allows users to like, complete, or share an action.
        """
        user = request.user
        action_id = request.data.get('action_id')
        interaction_type = request.data.get('interaction_type')

        if interaction_type not in ['like', 'complete', 'share']:
            return Response({"error": "Invalid interaction type."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            action = Action.objects.get(id=action_id)
            user_action, created = UserAction.objects.get_or_create(user=user, action=action, interaction_type=interaction_type)

            if created:
                return Response({"message": f"Action {interaction_type}d successfully!"}, status=status.HTTP_201_CREATED)
            return Response({"message": f"You have already {interaction_type}d this action."}, status=status.HTTP_400_BAD_REQUEST)

        except Action.DoesNotExist:
            return Response({"error": "Action not found."}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        """
        Retrieves all user interactions with actions.
        """
        user_actions = UserAction.objects.all()
        serializer = UserActionSerializer(user_actions, many=True)
        return Response(serializer.data)

class ActionFeedView(ListAPIView):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
