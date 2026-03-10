from rest_framework import serializers
from .models import BlogPost, Tag, ContentBlock, BlogUpdate
import markdown2

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'slug']

class ContentBlockSerializer(serializers.ModelSerializer):
    text_html = serializers.SerializerMethodField()

    class Meta:
        model = ContentBlock
        fields = ['id', 'block_type', 'order', 'text', 'text_html',
                  'image', 'image_caption', 'image_alt', 'link_url']

    def get_text_html(self, obj):
        if obj.block_type in ('text', 'quote') and obj.text:
            return markdown2.markdown(
                obj.text,
                extras=['fenced-code-blocks', 'tables']
            )
        return ''

class BlogUpdateSerializer(serializers.ModelSerializer):
    content_html = serializers.SerializerMethodField()

    class Meta:
        model = BlogUpdate
        fields = ['id', 'content', 'content_html', 'created']

    def get_content_html(self, obj):
        if obj.content:
            return markdown2.markdown(
                obj.content,
                extras=['fenced-code-blocks', 'tables']
            )
        return ''

class BlogPostSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    blocks = ContentBlockSerializer(many=True, read_only=True)
    updates = BlogUpdateSerializer(many=True, read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image',
                  'created', 'updated', 'published', 'tags', 'blocks', 'updates']
        lookup_field = 'slug'
