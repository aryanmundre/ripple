from django.urls import path, include

urlpatterns = [
    path('auth/', include('custom_auth.urls')),  # Authentication endpoints
    path('actions/', include('actions.urls')),  # Actions-related endpoints
    path('gamification/', include('gamification.urls')),  # Gamification-related endpoints
]
