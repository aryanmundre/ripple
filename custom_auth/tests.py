from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from firebase_admin import auth
from django.contrib.auth import get_user_model
from unittest.mock import patch
from rest_framework.exceptions import AuthenticationFailed

CustomUser = get_user_model()  # Use dynamic user model

class FirebaseAuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_token = "valid_token"
        self.invalid_token = "invalid_token"
        self.expired_token = "expired_token"
        self.firebase_uid = "firebase_test_uid"
        self.email = "testuser@example.com"

    @patch("firebase_admin.auth.verify_id_token")
    @patch("firebase_admin.auth.create_user")
    def test_register_user(self, mock_create_user, mock_verify_token):
        """Test user registration with Firebase."""
        mock_create_user.return_value.uid = self.firebase_uid

        response = self.client.post("/api/auth/register/", {
            "email": self.email,
            "password": "strongpassword",
            "display_name": "Test User"
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "User created successfully")
        self.assertEqual(response.data["uid"], self.firebase_uid)
        self.assertTrue(CustomUser.objects.filter(username=self.firebase_uid).exists())  # Ensure user was created

    @patch("firebase_admin.auth.get_user_by_email")
    @patch("firebase_admin.auth.create_custom_token")
    def test_login_user(self, mock_create_custom_token, mock_get_user_by_email):
        """Test user login using Firebase authentication."""
        mock_get_user_by_email.return_value.uid = self.firebase_uid
        mock_create_custom_token.return_value = b"custom_token"

        # Create user in Django database before login
        CustomUser.objects.create(username=self.firebase_uid, email=self.email)

        response = self.client.post("/api/auth/login/", {
            "email": self.email,
            "password": "testpassword"
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Login successful")
        self.assertEqual(response.data["uid"], self.firebase_uid)
        self.assertEqual(response.data["custom_token"], "custom_token")

    @patch("firebase_admin.auth.verify_id_token")
    def test_verify_token_valid(self, mock_verify_id_token):
        """Test verifying a valid Firebase token."""
        mock_verify_id_token.return_value = {"uid": self.firebase_uid}

        response = self.client.post("/api/auth/verify-token/", {
            "id_token": self.valid_token
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Token is valid")
        self.assertEqual(response.data["uid"], self.firebase_uid)

    @patch("firebase_admin.auth.verify_id_token")
    def test_verify_token_expired(self, mock_verify_id_token):
        """Test verifying an expired Firebase token."""
        mock_verify_id_token.side_effect = auth.ExpiredIdTokenError("Token has expired")

        response = self.client.post("/api/auth/verify-token/", {
            "id_token": self.expired_token
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["error"], "Firebase ID token has expired.")

    @patch("firebase_admin.auth.verify_id_token")
    def test_verify_token_invalid(self, mock_verify_id_token):
        """Test verifying an invalid Firebase token."""
        mock_verify_id_token.side_effect = auth.InvalidIdTokenError("Invalid token")

        response = self.client.post("/api/auth/verify-token/", {
            "id_token": self.invalid_token
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data["error"], "Invalid Firebase ID token.")

    @patch("firebase_admin.auth.revoke_refresh_tokens")
    def test_logout_user(self, mock_revoke_refresh_tokens):
        """Test user logout using Firebase authentication."""
        response = self.client.post("/api/auth/logout/", {
            "uid": self.firebase_uid
        }, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "User logged out successfully")
