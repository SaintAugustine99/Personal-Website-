from django.db import models
from django.urls import reverse
from django.utils.text import slugify

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    excerpt = models.TextField(max_length=500, help_text="Brief description")
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)

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

class ContentBlock(models.Model):
    BLOCK_TYPES = [
        ('text', 'Text (Markdown)'),
        ('image', 'Image'),
        ('heading', 'Heading'),
        ('quote', 'Quote'),
    ]
    post = models.ForeignKey(BlogPost, related_name='blocks', on_delete=models.CASCADE)
    block_type = models.CharField(max_length=10, choices=BLOCK_TYPES)
    order = models.PositiveIntegerField()
    text = models.TextField(blank=True)
    image = models.ImageField(upload_to='blog/blocks/', blank=True, null=True)
    image_caption = models.CharField(max_length=300, blank=True)
    image_alt = models.CharField(max_length=200, blank=True)
    link_url = models.URLField(blank=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.get_block_type_display()} block #{self.order} for {self.post.title}"

class BlogUpdate(models.Model):
    post = models.ForeignKey(BlogPost, related_name='updates', on_delete=models.CASCADE)
    content = models.TextField(help_text="Markdown content for this update")
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return f"Update on {self.created:%Y-%m-%d} for {self.post.title}"
