# donations/views.py
import stripe
from django.conf import settings
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Set your Stripe API key
#stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateDonationSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Create a Stripe Checkout Session for a donation.
        Expected POST data:
        - amount: Donation amount in dollars (e.g., 5.00)
        - charity: The charity/organization receiving the donation
        """
        amount = request.data.get("amount")
        charity = request.data.get("charity")
        if not amount or not charity:
            return JsonResponse({"error": "Amount and charity are required."}, status=400)
        
        # Convert amount to cents
        amount_cents = int(float(amount) * 100)
        
        YOUR_DOMAIN = "http://localhost:3000"  # For local testing; update on deployment

        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f"Donation for {charity}",
                        },
                        'unit_amount': amount_cents,
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=YOUR_DOMAIN + "/donation-success/",  #these should be updated to front end routes
                cancel_url=YOUR_DOMAIN + "/donation-cancel/", #these should be updated to front end routes
            )
            return JsonResponse({'id': checkout_session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
