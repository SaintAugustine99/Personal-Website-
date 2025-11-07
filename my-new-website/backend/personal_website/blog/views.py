from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer
import markdown2 # Keep markdown2

# This one ViewSet replaces both BlogListView and BlogDetailView
class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows blog posts to be viewed.
    """
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug' # To find posts by slug

    # We can override the retrieve method to add our markdown logic
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data

        # Add the converted HTML to the API response
        if instance.content_type == 'markdown':
            data['content_html'] = markdown2.markdown(
                instance.content, 
                extras=['fenced-code-blocks', 'tables']
            )
        else:
            data['content_html'] = instance.content

        return viewsets.Response(data)