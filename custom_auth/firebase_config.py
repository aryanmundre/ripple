# custom_auth/firebase_config.py
import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load all environment variables from .env
load_dotenv()

def initialize_firebase():
    # Only initialize if not already initialized
    if not firebase_admin._apps:
        # Retrieve the entire JSON string for Firebase credentials from the environment
        firebase_credentials_json = os.getenv("FIREBASE_CREDENTIALS")
        if not firebase_credentials_json:
            print("Warning: FIREBASE_CREDENTIALS not found in environment")
            return False
            
        try:
            # Parse the JSON string into a Python dictionary
            service_account_info = json.loads(firebase_credentials_json)
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred)
            return True
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON from environment variable: {e}")
            return False
        except Exception as e:
            print(f"Error initializing Firebase: {e}")
            return False
    return True

# Initialize Firebase when this module is imported
initialize_firebase()