import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

# Get the path to the Firebase service account key JSON file from the .env file
firebase_credentials_path = os.getenv("FIREBASE_CREDENTIALS")

if not firebase_credentials_path:
    raise ValueError("FIREBASE_CREDENTIALS not found in .env file")

print("FIREBASE_CREDENTIALS path:", firebase_credentials_path)  # Debugging line

try:
    with open(firebase_credentials_path, 'r') as f:
        service_account_info = json.load(f)
except FileNotFoundError:
    raise ValueError(f"File not found: {firebase_credentials_path}")
except json.JSONDecodeError as e:
    raise ValueError(f"Error decoding JSON from file: {e}")

cred = credentials.Certificate(service_account_info)
firebase_admin.initialize_app(cred)

