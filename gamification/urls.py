from django.urls import path
from .views import GamificationDataView, AwardPointsView

urlpatterns = [
    path('gamification_data/', GamificationDataView.as_view(), name='gamification-data'),
    path('award-points/', AwardPointsView.as_view(), name='award-points'),
]

