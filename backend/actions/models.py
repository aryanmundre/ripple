from django.db import models
from custom_auth.models import CustomUser  # Import the User model

class Action(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)  # e.g., "environment", "education"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class UserAction(models.Model):
    LIKE = 'like'
    COMPLETE = 'complete'
    SHARE = 'share'

    ACTION_TYPES = [
        (LIKE, 'Like'),
        (COMPLETE, 'Complete'),
        (SHARE, 'Share'),
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user_actions")
    action = models.ForeignKey(Action, on_delete=models.CASCADE, related_name="user_interactions")
    interaction_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    interacted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'action', 'interaction_type')  # Prevent duplicate interactions of the same type

    def __str__(self):
        return f"{self.user.username} {self.interaction_type} {self.action.name}"
