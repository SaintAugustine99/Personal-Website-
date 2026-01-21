from rest_framework import generics
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    """
    API endpoint that allows new contact messages to be created.
    Accepts POST requests from the React contact form.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def perform_create(self, serializer):
        # Save the message to the database
        instance = serializer.save()
        
        # Send email notification
        try:
            subject = f"New Contact from {instance.name}: {instance.subject}"
            message = f"""
            You have received a new message from your website contact form.
            
            Name: {instance.name}
            Email: {instance.email}
            Subject: {instance.subject}
            
            Message:
            {instance.message}
            """
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                ['kevinogetobwoma@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Error sending email: {e}")