from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Action, UserAction, TrendingLog

CustomUser = get_user_model()

class ActionAPITestCase(TestCase):
    """Test suite for the ActionFeedView, UserActionView, and other APIs."""

    def setUp(self):
        """Set up test data and initialize the test client."""
        self.client = APIClient()

        # Create a test user
        self.user = CustomUser.objects.create_user(username="testuser", password="testpassword")

        # Authenticate the test client
        self.client.force_authenticate(user=self.user)

        # Create test actions
        self.action1 = Action.objects.create(name="Plant Trees", description="Help plant trees", category="environment")
        self.action2 = Action.objects.create(name="Teach Kids", description="Tutor children", category="education")

        # Create a trending log
        TrendingLog.objects.create(trend_type=TrendingLog.CATEGORY, name="environment", score=10)

    def test_action_feed_view(self):
        """Test retrieving a list of actions from ActionFeedView."""
        response = self.client.get("/api/actions/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Ensure both actions are retrieved

    def test_user_action_post(self):
        """Test creating a user interaction with an action."""
        payload = {"action_id": self.action1.id, "interaction_type": "like"}
        response = self.client.post("/api/user-actions/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(UserAction.objects.filter(user=self.user, action=self.action1, interaction_type="like").exists())

    def test_user_action_invalid_type(self):
        """Test invalid interaction type in UserActionView."""
        payload = {"action_id": self.action1.id, "interaction_type": "invalid_type"}
        response = self.client.post("/api/user-actions/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Invalid interaction type.")

    def test_user_action_get(self):
        """Test retrieving all user interactions with actions."""
        UserAction.objects.create(user=self.user, action=self.action1, interaction_type="like")
        response = self.client.get("/api/user-actions/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["interaction_type"], "like")
        self.assertEqual(response.data[0]["action"], self.action1.id)

    def test_remove_user_action(self):
        """Test deleting a user action."""
        user_action = UserAction.objects.create(user=self.user, action=self.action1, interaction_type="like")
        payload = {"action_id": self.action1.id, "interaction_type": "like"}
        
        response = self.client.delete("/api/user-actions/remove/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(UserAction.objects.filter(id=user_action.id).exists())

    def test_action_detail_view(self):
        """Test retrieving details of a specific action."""
        response = self.client.get(f"/api/actions/{self.action1.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Plant Trees")

    def test_gamification_data(self):
        """Test fetching gamification data for the user."""
        response = self.client.get("/api/gamification/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "testuser")

    def test_trending_actions_view(self):
        """Test retrieving trending actions."""
        response = self.client.get("/api/actions/trending/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["category"], "environment")
