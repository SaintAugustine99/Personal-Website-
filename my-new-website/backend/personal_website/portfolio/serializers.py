from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'description', 'technologies',
            'github_url', 'live_url', 'youtube_url', 'thumbnail',
            'created', 'featured'
        ]
        lookup_field = 'slug'