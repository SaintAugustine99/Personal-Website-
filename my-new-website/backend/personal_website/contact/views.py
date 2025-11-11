# my-new-website/backend/personal_website/contact/views.py
from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageCreateView(generics.CreateAPIView):
    """
    API endpoint that allows new contact messages to be created.
    Accepts POST requests from the React contact form.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    # You can add permissions here later, like:
    # permission_classes = [permissions.AllowAny]