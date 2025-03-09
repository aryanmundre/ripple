from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Enforce unique emails
    is_verified = models.BooleanField(default=False)  # For email verification

    # Needed for users
    firebase_uid = models.CharField(max_length=255, blank=True, null=True)
    display_name = models.CharField(max_length=255, blank=True, null=True)

    # Ripple-specific fields
    points = models.PositiveIntegerField(default=0)  # Points earned through actions
    streak_days = models.PositiveIntegerField(default=0)  # Consecutive days of activity
    bio = models.TextField(null=True, blank=True)  # Short bio for the user's profile
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)  # User's avatar
    
    # User information
    date_of_birth = models.DateField(null=True, blank=True)  # User's date of birth
    street_address = models.CharField(max_length=255, null=True, blank=True)  # User's address
    city = models.CharField(max_length=100, null=True, blank=True)  # User's city
    state = models.CharField(max_length=100, null=True, blank=True)  # User's state
    zip_code = models.CharField(max_length=10, null=True, blank=True)  # User's ZIP code


    # Cause preferences
    interests = models.JSONField(default=dict)  # Store user-selected causes (e.g., {"environment": True, "education": False})
    preferred_time_commitment = models.PositiveIntegerField(null=True)  # Time available for actions in minutes

    # Social features
    badges_earned = models.JSONField(default=list)  # List of badge IDs the user has earned
    ripple_size = models.PositiveIntegerField(default=0)  # Impact size (e.g., how many users they’ve influenced)
    
    def __str__(self):
        return self.username  # Display username as object name in admin