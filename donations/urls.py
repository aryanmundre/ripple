# donations/urls.py
from django.urls import path
from .views import CreateDonationSessionView

urlpatterns = [
    path('create-checkout-session/', CreateDonationSessionView.as_view(), name='create-checkout-session'),
]
