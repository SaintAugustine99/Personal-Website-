from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import BlogPost
from .serializers import BlogPostSerializer
import markdown2

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows blog posts to be viewed.
    """
    # Ensure we only show published posts
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # Add the converted HTML to the API response
        if instance.content_type == 'markdown':
            # Add 'tables' to extras for better formatting
            data['content_html'] = markdown2.markdown(
                instance.content, 
                extras=['fenced-code-blocks', 'tables']
            )
        else:
            data['content_html'] = instance.content

        return Response(data)