# donations/views.py
import stripe
from django.conf import settings
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Donation

# Set your Stripe API key
#stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateDonationSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        amount = request.data.get("amount")
        charity = request.data.get("charity")
        if not amount or not charity:
            return JsonResponse({"error": "Amount and charity are required."}, status=400)

        # Convert amount to cents
        amount_cents = int(float(amount) * 100)

        YOUR_DOMAIN = "http://localhost:3000"  # Update on deployment

        try:
            # Create a Donation instance in pending state
            donation = Donation.objects.create(
                donor=request.user,
                charity=charity,
                amount=amount,
                status='pending'
            )

            # Create the Stripe Checkout Session, including the donation ID as metadata
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
                success_url=YOUR_DOMAIN + f"/donation-success/?session_id={{CHECKOUT_SESSION_ID}}",
                cancel_url=YOUR_DOMAIN + "/donation-cancel/",
                metadata={'donation_id': donation.id}
            )

            # Update the donation with the checkout session id for later reference
            donation.stripe_checkout_session_id = checkout_session.id
            donation.save()

            return JsonResponse({'id': checkout_session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
