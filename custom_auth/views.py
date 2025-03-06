from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from custom_auth.models import CustomUser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class RegisterView(APIView):
    @swagger_auto_schema(
        operation_summary="Register a new user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
                'display_name': openapi.Schema(type=openapi.TYPE_STRING, description='User display name')
            }
        ),
        responses={
            201: openapi.Response(description="User created"),
            400: "Invalid request body"
        }
    )
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        display_name = request.data.get('display_name', '')

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create user in Firebase
            firebase_user = auth.create_user(
                email=email,
                password=password,
                display_name=display_name
            )

            # Save user in PostgreSQL
            CustomUser.objects.create(
                firebase_uid=firebase_user.uid,
                email=email,
                display_name=display_name
            )

            return Response({
                "message": "User created successfully",
                "uid": firebase_user.uid
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    @swagger_auto_schema(
        operation_summary="Login a user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password')
            }
        ),
        responses={
            200: openapi.Response(description="Login successful"),
            400: "Invalid request body",
            404: "User not found"
        }
    )
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify Firebase user
            firebase_user = auth.get_user_by_email(email)

            # Ensure user exists in PostgreSQL
            user_profile = get_object_or_404(CustomUser, firebase_uid=firebase_user.uid)

            # Generate custom token for frontend
            custom_token = auth.create_custom_token(firebase_user.uid)

            return Response({
                "message": "Login successful",
                "uid": firebase_user.uid,
                "custom_token": custom_token.decode('utf-8'),
                "user_profile": {
                    "email": user_profile.email,
                    "display_name": user_profile.display_name
                }
            }, status=status.HTTP_200_OK)
        except auth.UserNotFoundError:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class VerifyTokenView(APIView):
    @swagger_auto_schema(
        operation_summary="Verify a user's ID token",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['id_token'],
            properties={
                'id_token': openapi.Schema(type=openapi.TYPE_STRING, description='User ID token')
            }
        ),
        responses={
            200: openapi.Response(description="Token is valid"),
            400: "Invalid request body",
            401: "Invalid token"
        }
    )
    def post(self, request):
        id_token = request.data.get('id_token')

        if not id_token:
            return Response({"error": "ID token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
            return Response({"message": "Token is valid", "uid": uid}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    @swagger_auto_schema(
        operation_summary="Logout a user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['uid'],
            properties={
                'uid': openapi.Schema(type=openapi.TYPE_STRING, description='User ID')
            }
        ),
        responses={
            200: openapi.Response(description="User logged out successfully"),
            400: "Invalid request body"
        }
    )
    def post(self, request):
        uid = request.data.get('uid')

        if not uid:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            auth.revoke_refresh_tokens(uid)
            return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)