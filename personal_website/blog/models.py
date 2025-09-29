from django.db import models

# Create your models here.
from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class BlogPost(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('markdown', 'Markdown'),
        ('html', 'HTML with Visualization'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    excerpt = models.TextField(max_length=500, help_text="Brief description")
    content = models.TextField()
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE_CHOICES, default='markdown')
    
    # Visualization fields
    has_visualization = models.BooleanField(default=False)
    visualization_slug = models.CharField(max_length=100, blank=True, 
                                         help_text="Folder name in /static/visualizations/")
    visualization_height = models.IntegerField(default=400, 
                                              help_text="iframe height in pixels")
    
    # Meta fields
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created']
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
    def get_absolute_url(self):
        return reverse('blog:post_detail', kwargs={'slug': self.slug})
    
    def __str__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name

# Add to BlogPost model
tags = models.ManyToManyField(Tag, related_name='posts', blank=True)