from django.db import models

# Create your models here.
from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    technologies = models.CharField(max_length=200, help_text="Comma-separated")
    
    # Links
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    
    # Media
    thumbnail = models.ImageField(upload_to='portfolio/')
    
    # Dates
    created = models.DateTimeField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0, help_text="Lower numbers appear first")
    
    class Meta:
        ordering = ['order', '-created']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        return reverse('portfolio:project_detail', kwargs={'slug': self.slug})
    
    def __str__(self):
        return self.title