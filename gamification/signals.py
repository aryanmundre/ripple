from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import GamificationProfile

CustomUser = get_user_model()

@receiver(post_save, sender=CustomUser)
def create_gamification_profile(sender, instance, created, **kwargs):
    if created:
        GamificationProfile.objects.create(user=instance)

@receiver(post_save, sender=CustomUser)
def save_gamification_profile(sender, instance, **kwargs):
    instance.gamification.save()
