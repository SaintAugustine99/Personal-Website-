from rest_framework import serializers
from .models import BlogPost, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']

class BlogPostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'content', 
            'content_type', 'has_visualization', 'visualization_slug',
            'visualization_height', 'featured_image', 'created', 'tags'
        ]
        lookup_field = 'slug' 