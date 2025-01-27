import os 
import json
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv


# Load environment variables from the .env file
load_dotenv()

# Get the Firebase service account key from the .env file
firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")

if not firebase_credentials:
    raise ValueError("FIREBASE_CREDENTIALS not found in .env file")

service_account_info = json.loads(firebase_credentials)

cred = credentials.Certificate(service_account_info)
firebase_admin.initialize_app(cred)
