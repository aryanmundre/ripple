from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    # Add your custom fields to the admin view
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('points', 'streak_days', 'bio', 'profile_picture', 'interests', 'preferred_time_commitment', 'badges_earned', 'ripple_size'),
        }),
    )

admin.site.register(CustomUser, CustomUserAdmin)
