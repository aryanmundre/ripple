from django.contrib import admin
from django.urls import path  #  Import path
from .views import RegisterView, VerifyTokenView, LogoutView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-token/', VerifyTokenView.as_view(), name='verify_token'),
    path('logout/', LogoutView.as_view(), name='logout'),
]