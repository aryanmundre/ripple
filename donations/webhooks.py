# donations/webhooks.py
import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Donation

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        donation_id = session.get('metadata', {}).get('donation_id')

        # Update the donation record accordingly
        if donation_id:
            try:
                donation = Donation.objects.get(id=donation_id)
                donation.status = 'completed'
                donation.save()
            except Donation.DoesNotExist:
                # Optionally, log this exception
                pass

    return HttpResponse(status=200)
