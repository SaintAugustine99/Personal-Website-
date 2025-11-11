# my-new-website/backend/personal_website/contact/serializers.py
from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        # We only need these fields from the React form
        # 'created' and 'read' are handled automatically
        fields = ['name', 'email', 'message']

    def create(self, validated_data):
        # Set a default subject since the React form doesn't send one
        validated_data['subject'] = 'New Contact Form Submission'
        return ContactMessage.objects.create(**validated_data)