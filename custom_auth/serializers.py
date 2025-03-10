from rest_framework import serializers
from custom_auth.models import CustomUser

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    display_name = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        from firebase_admin import auth
        
        email = validated_data.get("email")
        password = validated_data.get("password")
        display_name = validated_data.get("display_name", "")

        try:
            # Create user in Firebase
            firebase_user = auth.create_user(
                email=email,
                password=password,
                display_name=display_name
            )

            # Generate a username from the email (before the @)
            username = email.split('@')[0]
            
            # Make sure username is unique by appending numbers if needed
            base_username = username
            counter = 1
            while CustomUser.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            # Save user in PostgreSQL
            user = CustomUser.objects.create(
                firebase_uid=firebase_user.uid,
                email=email,
                display_name=display_name,
                username=username  # Set the unique username
            )
            return user
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        from firebase_admin import auth
        from django.shortcuts import get_object_or_404
        
        email = data.get("email")
        password = data.get("password")

        try:
            # Verify Firebase user
            firebase_user = auth.get_user_by_email(email)

            # Ensure user exists in PostgreSQL
            user_profile = get_object_or_404(CustomUser, firebase_uid=firebase_user.uid)

            # Generate custom token for frontend
            custom_token = auth.create_custom_token(firebase_user.uid)

            return {
                "uid": firebase_user.uid,
                "custom_token": custom_token.decode("utf-8"),
                "user_profile": {
                    "email": user_profile.email,
                    "display_name": user_profile.display_name
                }
            }
        except auth.UserNotFoundError:
            raise serializers.ValidationError({"error": "User not found"})
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})


class VerifyTokenSerializer(serializers.Serializer):
    id_token = serializers.CharField()

    def validate(self, data):
        from firebase_admin import auth
        
        id_token = data.get("id_token")
        
        try:
            decoded_token = auth.verify_id_token(id_token)
            return {"uid": decoded_token["uid"]}
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})


class LogoutSerializer(serializers.Serializer):
    uid = serializers.CharField()

    def validate(self, data):
        from firebase_admin import auth
        
        uid = data.get("uid")

        try:
            auth.revoke_refresh_tokens(uid)
            return {"message": "User logged out successfully"}
        except Exception as e:
            raise serializers.ValidationError({"error": str(e)})


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "email", "display_name", "is_verified", "points", "streak_days", "bio", 
            "profile_picture", "interests", "preferred_time_commitment", "badges_earned", "ripple_size", "city", "date_of_birth", "state", "street_address", "zip_code"
        ]
