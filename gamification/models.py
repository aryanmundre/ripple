from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class Reward(models.Model):
    """
    Defines reward tiers based on points, streaks, and badges.
    """
    name = models.CharField(max_length=100)
    description = models.TextField()
    points_required = models.PositiveIntegerField(default=0)
    streak_days_required = models.PositiveIntegerField(default=0)
    badge_required = models.CharField(max_length=100, null=True, blank=True)  # Optional badge requirement

    def __str__(self):
        return self.name

# Extend user model for gamification tracking
class GamificationProfile(models.Model):
    """
    Stores user-specific gamification details.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="gamification")
    points = models.PositiveIntegerField(default=0)
    streak_days = models.PositiveIntegerField(default=0)
    last_active_date = models.DateField(null=True, blank=True)
    badges_earned = models.JSONField(default=list)

    def update_streak(self):
        """Update the user's daily streak if they are active."""
        from django.utils.timezone import now, timedelta
        today = now().date()

        if self.last_active_date == today:
            return  # No change if user is already active today

        if self.last_active_date == today - timedelta(days=1):
            self.streak_days += 1  # Continue streak
        else:
            self.streak_days = 1  # Reset streak

        self.last_active_date = today
        self.save()

    def add_points(self, amount):
        """Add points to the user's profile."""
        self.points += amount
        self.save()

    def add_badge(self, badge_name):
        """Add a badge to the user's profile if not already earned."""
        if badge_name not in self.badges_earned:
            self.badges_earned.append(badge_name)
            self.save()
