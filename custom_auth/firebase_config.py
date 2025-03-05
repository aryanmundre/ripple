import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load all environment variables from .env
load_dotenv()

# Retrieve the entire JSON string for Firebase credentials from the environment
firebase_credentials_json = os.getenv("FIREBASE_CREDENTIALS")

if not firebase_credentials_json:
    raise ValueError("FIREBASE_CREDENTIALS not found in .env file")

try:
    # Parse the JSON string into a Python dictionary
    service_account_info = json.loads(firebase_credentials_json)
except json.JSONDecodeError as e:
    raise ValueError(f"Error decoding JSON from environment variable: {e}")

# Initialize Firebase Admin only if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(service_account_info)
    firebase_admin.initialize_app(cred)
