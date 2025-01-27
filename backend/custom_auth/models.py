from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Enforce unique emails
    is_verified = models.BooleanField(default=False)  # For email verification

    # Ripple-specific fields
    points = models.PositiveIntegerField(default=0)  # Points earned through actions
    streak_days = models.PositiveIntegerField(default=0)  # Consecutive days of activity
    bio = models.TextField(blank=True, null=True)  # Short bio for the user's profile
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)  # User's avatar

    # Cause preferences
    interests = models.JSONField(default=dict)  # Store user-selected causes (e.g., {"environment": True, "education": False})
    preferred_time_commitment = models.PositiveIntegerField(blank=True, null=True)  # E.g., minutes available for actions

    # Social features
    badges_earned = models.JSONField(default=list)  # List of badge IDs the user has earned
    ripple_size = models.PositiveIntegerField(default=0)  # Impact size (e.g., how many users they’ve influenced)

    pass