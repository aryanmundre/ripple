from django.db import models
from custom_auth.models import CustomUser  # Import the User model
from django.utils import timezone
from datetime import timedelta

class Action(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    organization = models.CharField(max_length=100)
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

    # Variables to Keep track of trending
    is_trending = models.BooleanField(default=True)
    trend_expires_at = models.DateTimeField(default=lambda: timezone.now() + timedelta(days=7))

    class Meta:
        unique_together = ('user', 'action', 'interaction_type')  # Prevent duplicate interactions of the same type

    def __str__(self):
        return f"{self.user.username} {self.interaction_type} {self.action.name}"

    @staticmethod
    def remove_expired_trends():
        now = timezone.now()
        UserAction.objects.filter(is_trending=True, trend_expires_at__lte=now).update(is_trending=False)

from django.db import models
from django.utils import timezone
from datetime import timedelta

class TrendingLog(models.Model):
    CATEGORY = 'category'
    ORGANIZATION = 'organization'

    TREND_TYPE_CHOICES = [
        (CATEGORY, 'Category'),
        (ORGANIZATION, 'Organization'),
    ]

    trend_type = models.CharField(max_length=20, choices=TREND_TYPE_CHOICES) 
    name = models.CharField(max_length=255)  
    score = models.IntegerField(default=0)  
    last_updated = models.DateTimeField(auto_now=True) 

    class Meta:
        unique_together = ('trend_type', 'name') 

    def __str__(self):
        return f"{self.name} ({self.trend_type}) {self.score}"

    @staticmethod
    def update_trend_scores():
        now = timezone.now()

        # Reset all scores 
        TrendingLog.objects.all().update(score=0)

        # Seperate UserAction date based on type 
        category_trends = (
            UserAction.objects.filter(is_trending=True).values('action__category').annotate(total_score=models.Count('id')) 
        )

        organization_trends = (
            UserAction.objects.filter(is_trending=True).values('action__organization').annotate(total_score=models.Count('id')) 
        )


        for trend in category_trends:
            category_name = trend['action__category']
            score = trend['total_score']
            TrendingLog.objects.update_or_create(trend_type=TrendingLog.CATEGORY, name=category_name, defaults={'score': score, 'last_updated': now}
            )

        for trend in organization_trends:
            organization_name = trend['action__organization']
            score = trend['total_score']
            TrendingLog.objects.update_or_create(trend_type=TrendingLog.ORGANIZATION,name=organization_name,defaults={'score': score, 'last_updated': now}
            )

    