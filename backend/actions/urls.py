from django.urls import path
from .views import (
    UserActionView,
    UserActionListView,
    RemoveUserActionView,
    GamificationDataView,
    RecommendationActionListView,
    ActionByCategoryView,
)

urlpatterns = [
    path("category/", ActionByCategoryView.as_view(), name="actions-by-category"),  # Filter actions by category
    path("trending/", RecommendationActionListView.as_view(), name="trending-actions"),  # Get trending actions

    path("user-actions/", UserActionView.as_view(), name="user-actions"),  # Create & retrieve user interaction
    path("user-actions/list/", UserActionListView.as_view(), name="user-actions-list"),  # List actions a user has completed
    path("user-actions/remove/", RemoveUserActionView.as_view(), name="remove-user-action"),  # Remove a user action

    path("gamification/", GamificationDataView.as_view(), name="gamification-data"),  # Get gamification data
]
