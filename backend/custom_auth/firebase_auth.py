from django.contrib.auth.models import User 
from firebase_admin import auth as firebase_auth
from django.utils.deprecation import MiddlewareMixin


class FirebaseAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1]  
            try:

                decoded_token = firebase_auth.verify_id_token(token)
                firebase_uid = decoded_token["uid"]


                user, created = User.objects.get_or_create(username=firebase_uid)
                request.user = user

            except Exception as e:

                print(f"Authentication failed: {e}")
                request.user = None
        else:
            request.user = None