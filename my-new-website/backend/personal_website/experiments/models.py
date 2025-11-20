from django.db import models

# Create your models here.
from django.db import models
from django.utils.text import slugify

class Experiment(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active/In Progress'),
        ('completed', 'Completed'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    
    # Visuals
    thumbnail = models.ImageField(upload_to='experiments/thumbnails/')
    video_url = models.URLField(blank=True, help_text="Optional: Link to a demo video")
    
    # Interaction
    sandbox_url = models.URLField(blank=True, help_text="URL to embed (e.g. CodePen, StackBlitz) or internal route")
    github_url = models.URLField(blank=True)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0, help_text="Lower numbers appear first")

    class Meta:
        ordering = ['order', '-created']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title