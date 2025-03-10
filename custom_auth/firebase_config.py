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
        # First try to read from Render secret files
        firebase_credentials_path = "/etc/secrets/FIREBASE_CREDENTIALS"
        firebase_credentials_json = None
        
        # Try to read from secret file first
        try:
            if os.path.exists(firebase_credentials_path):
                with open(firebase_credentials_path, 'r') as f:
                    firebase_credentials_json = f.read()
                print("Firebase credentials loaded from Render secret file")
        except Exception as e:
            print(f"Could not read from secret file: {e}")
        
        # Fall back to environment variable if secret file doesn't exist
        if not firebase_credentials_json:
            firebase_credentials_json = os.getenv("FIREBASE_CREDENTIALS")
            
        if not firebase_credentials_json:
            raise ValueError("FIREBASE_CREDENTIALS not found in secret files or environment variables. Please set this in your Render dashboard.")
            
        try:
            # Parse the JSON string into a Python dictionary
            service_account_info = json.loads(firebase_credentials_json)
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred)
            print("Firebase initialized successfully!")
            return True
        except json.JSONDecodeError as e:
            raise ValueError(f"Error decoding Firebase credentials JSON: {e}. Please check the format of your credentials.")
        except Exception as e:
            raise ValueError(f"Error initializing Firebase: {e}. Please check your Firebase credentials.")
    return True

# Initialize Firebase when this module is imported
initialize_firebase()