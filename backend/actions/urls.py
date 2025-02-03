from django.urls import path
from .views import ActionFeedView
from .views import UserActionView

urlpatterns = [
    path('actions/', ActionFeedView.as_view(), name='action-feed'),
    path('interactions/', UserActionView.as_view(), name='user-actions'),
]
