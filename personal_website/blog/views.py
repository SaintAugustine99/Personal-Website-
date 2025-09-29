from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView, DetailView
from .models import BlogPost
import markdown2

class BlogListView(ListView):
    model = BlogPost
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10
    
    def get_queryset(self):
        return BlogPost.objects.filter(published=True)

class BlogDetailView(DetailView):
    model = BlogPost
    template_name = 'blog/post_detail.html'
    context_object_name = 'post'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.object.content_type == 'markdown':
            context['content_html'] = markdown2.markdown(
                self.object.content, 
                extras=['fenced-code-blocks', 'tables']
            )
        else:
            context['content_html'] = self.object.content
        return context