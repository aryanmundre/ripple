from django.db import models
from custom_auth.models import CustomUser  # Import the User model
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count

class Action(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    organization = models.CharField(max_length=100, default="default_org")
    category = models.CharField(max_length=50, default="general")  # Default to "general"
    action_type = models.CharField(max_length=50, default="volunteering")  # Default action type
    location = models.CharField(max_length=255, blank=True, null=True)  # Optional location
    created_at = models.DateTimeField(auto_now_add=True)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)  # organization's avatar
    thumbnail = models.ImageField(upload_to="thubnails/", null = True, blank = True)

    def __str__(self):
        return self.name
    
class Organization(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    
    def __str__(self):
        return self.name

def default_trend_expiry():
    return timezone.now() + timedelta(days=7)

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
    trend_expires_at = models.DateTimeField(default=default_trend_expiry)  

    class Meta:
        unique_together = ('user', 'action', 'interaction_type')  # Prevent duplicate interactions of the same type

    def __str__(self):
        return f"{self.user.username} {self.interaction_type} {self.action.name}"

    @staticmethod
    def remove_expired_trends():
        now = timezone.now()
        UserAction.objects.filter(is_trending=True, trend_expires_at__lte=now).update(is_trending=False)

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

        # Get trending counts for categories and organizations
        category_trends = (
            UserAction.objects.filter(is_trending=True)
            .values('action__category')
            .annotate(total_score=Count('id'))
        )

        organization_trends = (
            UserAction.objects.filter(is_trending=True)
            .values('action__organization')
            .annotate(total_score=Count('id'))
        )

        # Update only the relevant categories
        for trend in category_trends:
            category_name = trend['action__category']
            score = trend['total_score']
            TrendingLog.objects.update_or_create(
                trend_type=TrendingLog.CATEGORY, name=category_name,
                defaults={'score': score, 'last_updated': now}
            )

        # Update only the relevant organizations
        for trend in organization_trends:
            organization_name = trend['action__organization']
            score = trend['total_score']
            TrendingLog.objects.update_or_create(
                trend_type=TrendingLog.ORGANIZATION, name=organization_name,
                defaults={'score': score, 'last_updated': now}
            )

        TrendingLog.objects.filter(score=0).delete()
