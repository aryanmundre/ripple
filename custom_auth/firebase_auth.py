from django.contrib.auth import get_user_model
from firebase_admin import auth as firebase_auth
from django.utils.deprecation import MiddlewareMixin
from rest_framework.exceptions import AuthenticationFailed

CustomUser = get_user_model()

class FirebaseAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1]
            try:
                decoded_token = firebase_auth.verify_id_token(token)
                firebase_uid = decoded_token["uid"]

                # Ensure user exists or create a new one
                user, created = CustomUser.objects.get_or_create(username=firebase_uid)

                request.user = user  # Attach the authenticated user

            except firebase_auth.ExpiredIdTokenError:
                raise AuthenticationFailed("Firebase ID token has expired.")
            except firebase_auth.InvalidIdTokenError:
                raise AuthenticationFailed("Invalid Firebase ID token.")
            except firebase_auth.UserNotFoundError:
                raise AuthenticationFailed("User not found in Firebase.")
            except Exception as e:
                raise AuthenticationFailed(f"Authentication failed: {str(e)}")
        else:
            request.user = None  # No auth provided, set as anonymous user
