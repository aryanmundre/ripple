from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from custom_auth.models import CustomUser
from custom_auth.serializers import UserProfileSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
import requests

class RegisterView(APIView):
    @swagger_auto_schema(
        operation_summary="Register a new user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
                'display_name': openapi.Schema(type=openapi.TYPE_STRING, description='User display name'),
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username (optional, will use email if not provided)')
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
        username = request.data.get('username', '').strip()

        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Use email as username if no username provided
        if not username:
            username = email

        try:
            # Check if user exists in our database first
            if CustomUser.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            if CustomUser.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            # Create user in Firebase
            try:
                firebase_user = auth.create_user(
                    email=email,
                    password=password,
                    display_name=display_name
                )
            except auth.EmailAlreadyExistsError:
                return Response({"error": "Email already exists in Firebase"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": f"Firebase error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            # Save user in PostgreSQL
            try:
                user = CustomUser.objects.create(
                    username=username,
                    firebase_uid=firebase_user.uid,
                    email=email,
                    display_name=display_name
                )
                return Response({
                    "message": "User created successfully",
                    "uid": firebase_user.uid,
                    "username": user.username
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                # If PostgreSQL creation fails, delete the Firebase user
                auth.delete_user(firebase_user.uid)
                return Response({"error": f"Database error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

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

    def get_id_token(self, custom_token):
        # Firebase REST API endpoint for token exchange
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken"
        
        # Your Firebase project's web API key
        api_key = "YOUR_FIREBASE_API_KEY"
        
        # Request payload
        payload = {
            "token": custom_token,
            "returnSecureToken": True
        }
        
        # Make the request
        response = requests.post(f"{url}?key={api_key}", json=payload)
        
        if response.status_code == 200:
            id_token = response.json().get("idToken")
            return id_token
        else:
            raise Exception(f"Error exchanging token: {response.json()}")
    
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
            id_token = self.get_id_token(custom_token)

            return Response({
                "message": "Login successful",
                "uid": firebase_user.uid,
                "id_token": id_token,
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
        
# Get user profile
class UserProfileView(APIView):
    @swagger_auto_schema(
        operation_summary="Get user profile",
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            )
        ],
        responses={
            200: UserProfileSerializer,
            404: "User not found"
        }
    )
    def get(self, request):
        uid = request.query_params.get('uid')
        
        if not uid:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = get_object_or_404(CustomUser, firebase_uid=uid)
            serializer = UserProfileSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
    
    @swagger_auto_schema(
        operation_summary="Update user profile",
        request_body=UserProfileSerializer,
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            )
        ],
        responses={
            200: UserProfileSerializer,
            400: "Invalid request body",
            404: "User not found"
        }
    )
    def patch(self, request):
        uid = request.query_params.get('uid')
        
        if not uid:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = get_object_or_404(CustomUser, firebase_uid=uid)
            serializer = UserProfileSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

# Upload profile picture
class ProfilePictureUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    @swagger_auto_schema(
        operation_summary="Upload profile picture",
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            ),
            openapi.Parameter(
                name='profile_picture',
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                required=True,
                description='Profile picture file'
            )
        ],
        responses={
            200: "Profile picture uploaded successfully",
            400: "Invalid request body",
            404: "User not found"
        }
    )
    def post(self, request):
        uid = request.query_params.get('uid')
        
        if not uid or 'profile_picture' not in request.FILES:
            return Response({"error": "User ID and profile picture are required"}, 
                            status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = get_object_or_404(CustomUser, firebase_uid=uid)
            user.profile_picture = request.FILES['profile_picture']
            user.save()
            return Response({"message": "Profile picture uploaded successfully"}, 
                           status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

# Update user interests
class UserInterestsView(APIView):
    @swagger_auto_schema(
        operation_summary="Update user interests",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'interests': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    description='User interests as key-value pairs',
                    example={'environment': True, 'education': False, 'healthcare': True}
                )
            },
            required=['interests']
        ),
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            )
        ],
        responses={
            200: "Interests updated successfully",
            400: "Invalid request body",
            404: "User not found"
        }
    )
    def post(self, request):
        uid = request.query_params.get('uid')
        interests = request.data.get('interests')
        
        if not uid or not interests:
            return Response({"error": "User ID and interests are required"}, 
                            status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = get_object_or_404(CustomUser, firebase_uid=uid)
            user.interests = interests
            user.save()
            return Response({"message": "Interests updated successfully", 
                             "interests": user.interests}, 
                            status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)


# Email verification
class EmailVerificationView(APIView):
    @swagger_auto_schema(
        operation_summary="Send email verification",
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            )
        ],
        responses={
            200: "Verification email sent",
            400: "Invalid request",
            404: "User not found"
        }
    )
    def post(self, request):
        uid = request.query_params.get('uid')
        
        if not uid:
            return Response({"error": "User ID is required"}, 
                            status=status.HTTP_400_BAD_REQUEST)
            
        try:
            # Get Firebase user
            firebase_user = auth.get_user(uid)
            
            # Generate verification link
            # Note: You would typically use Firebase's email verification here
            # This is a simplified example
            link = auth.generate_email_verification_link(firebase_user.email)
            
            # In a real app, you would send this link via email
            # Here we're just returning it in the response
            
            return Response({"message": "Verification email link generated", 
                            "verification_link": link}, 
                           status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
            
    @swagger_auto_schema(
        operation_summary="Confirm email verification",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'verification_code': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Verification code from the email'
                )
            },
            required=['verification_code']
        ),
        manual_parameters=[
            openapi.Parameter(
                name='uid',
                in_=openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description='Firebase UID of the user',
                required=True
            )
        ],
        responses={
            200: "Email verified successfully",
            400: "Invalid request body",
            404: "User not found"
        }
    )
    def patch(self, request):
        uid = request.query_params.get('uid')
        verification_code = request.data.get('verification_code')
        
        if not uid or not verification_code:
            return Response({"error": "User ID and verification code are required"}, 
                            status=status.HTTP_400_BAD_REQUEST)
            
        try:
            # In a real implementation, you would verify the code
            # Here we're just setting the user as verified
            
            user = get_object_or_404(CustomUser, firebase_uid=uid)
            user.is_verified = True
            user.save()
            
            return Response({"message": "Email verified successfully"}, 
                           status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)

# Get all users
class AllUsersView(APIView):
    @swagger_auto_schema(
        operation_summary="Get all users",
        responses={
            200: UserProfileSerializer(many=True),
            400: "Bad Request"
        }
    )
    def get(self, request):
        try:
            users = CustomUser.objects.all()
            serializer = UserProfileSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)