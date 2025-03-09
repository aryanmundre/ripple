# custom_auth/apps.py
from django.apps import AppConfig

class CustomAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'custom_auth'
    
    def ready(self):
        # Import and initialize Firebase configuration
        import custom_auth.firebase_config