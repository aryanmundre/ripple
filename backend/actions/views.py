from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.db.models import Count
from .models import Action, TrendingLog, UserAction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import UserAction
from .serializers import UserActionSerializer, ActionDetailSerializer, ActionListSerializer, GamificationDataSerializer
from .recommendations import get_recommendations
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class UserActionView(APIView):
    """
    API for creating and retrieving user interactions with actions.
    """

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
            operation_summary="Like, complete, or share an action",
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                required=['action_id', 'interaction_type'],
                properties={
                    'action_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Action ID'),
                    'interaction_type': openapi.Schema(type=openapi.TYPE_STRING, description='Interaction type (like, complete, share)')
                }
            ),
            responses={
                201: openapi.Response(description="Action interaction created"),
                400: "Invalid interaction type",
                404: "Action not found"
            }
    )
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
    
    @swagger_auto_schema(
        operation_summary="Retrieve all user interactions with actions",
        responses={200: UserActionSerializer(many=True)}
    )
    def get(self, request):
        """
        Retrieves all user interactions with actions.
        """
        user_actions = UserAction.objects.all()
        serializer = UserActionSerializer(user_actions, many=True)
        return Response(serializer.data)



class ActionByOrganizationView(ListAPIView):
    """
    API to fetch actions filtered by organization.
    """
    serializer_class = ActionDetailSerializer
    queryset = Action.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['organization']  # Enables filtering by organization

    def get_queryset(self):
        """
        Optionally filters the queryset based on an organization query parameter.
        """
        organization = self.request.query_params.get('organization', None)
        if organization:
            return Action.objects.filter(organization=organization)
        return super().get_queryset()
    
class ActionByCategoryView(ListAPIView):
    """
    API to fetch actions filtered by category.
    """
    serializer_class = ActionDetailSerializer
    queryset = Action.objects.all()
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['category']  # Enables filtering by category

    
    def get_queryset(self):
        """
        Optionally filters the queryset based on a category query parameter.
        """
        category = self.request.query_params.get('category', None)
        if category:
            return Action.objects.filter(category=category)
        return super().get_queryset()

class UserActionListView(APIView):
    """
    Retrieves all the actions that a specific user has completed
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve all actions a user has completed",
        responses={200: UserActionSerializer(many=True)}
    )
    def get(self, request):
        user_actions = UserAction.objects.filter(user=request.user)
        serializer = UserActionSerializer(user_actions, many = True)
        return Response(serializer.data)
    

class RemoveUserActionView(APIView):
    """
    API to delete a user action
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Remove a user action",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['action_id', 'interaction_type'],
            properties={
                'action_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='Action ID'),
                'interaction_type': openapi.Schema(type=openapi.TYPE_STRING, description='Interaction type')
            }
        ),
        responses={
            200: "Action removed successfully",
            404: "Interaction was not found"
        }
    )
    def delete(self, request):
        user = request.user
        action_id = request.data.get("action_id")
        interaction_type = request.data.get("interaction_type")
        try:
            user_action = UserAction.objects.get(user=user, action_id=action_id, interaction_type=interaction_type)
            user_action.delete()
            return Response({"message" : f"Action {interaction_type} was removed successfully."}, status.HTTP_200_OK)
        except UserAction.DoesNotExist:
            return Response({"error" : "Interaction was not found"}, status.HTTP_404_NOT_FOUND)

class ActionDetailView(RetrieveAPIView):
    """
    API to retrieve detailed information about an action
    """
    queryset = Action.objects.all()
    serializer_class = ActionDetailSerializer
    lookup_field = "id"

        
class RecommendationActionListView(APIView):
    """
    API to get a list of actions sorted by the recommendation algorithm
    """
    
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve recommended actions",
        responses={200: ActionListSerializer(many=True)}
    )
    def get(self, request):
        user = request.user

        trending_counts = {} # Set to empty for testing purposes
        recommended_actions = get_recommendations(user, trending_counts)
        serializer = ActionListSerializer(recommended_actions, many = True)
        return Response(serializer.data)

class GamificationDataView(APIView):
    """
    API to fetch gamification data for the logged-in user.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve gamification data",
        responses={200: GamificationDataSerializer()}
    )
    def get(self, request):
        user = request.user
        serializer = GamificationDataSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)