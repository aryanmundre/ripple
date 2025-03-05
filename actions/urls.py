from django.urls import path
from .views import (
    ActionFeedView,
    ActionByOrganizationView,
    ActionByCategoryView,
    ActionDetailView,
    RecommendationActionListView,
    UserActionView,
    UserActionListView,
    RemoveUserActionView,
    GamificationDataView,
)

urlpatterns = [
    path("feed/", ActionFeedView.as_view(), name="action-feed"),
    path("org/", ActionByOrganizationView.as_view(), name="actions-by-organization"),
    path("category/", ActionByCategoryView.as_view(), name="actions-by-category"),
    path("detail/<int:id>/", ActionDetailView.as_view(), name="action-detail"),
    path("trending/", RecommendationActionListView.as_view(), name="trending-actions"),
    path("user-actions/", UserActionView.as_view(), name="user-actions"),
    path("user-actions/list/", UserActionListView.as_view(), name="user-actions-list"),
    path("user-actions/remove/", RemoveUserActionView.as_view(), name="remove-user-action"),
    path("gamification/", GamificationDataView.as_view(), name="gamification-data"),
]
