from django.urls import path
from .views import GamificationView

urlpatterns = [
    path('gamification/', GamificationView.as_view(), name='gamification'),
]
