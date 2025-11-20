from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import BlogPost, Tag, BlogImage

class BlogImageInline(admin.TabularInline):
    model = BlogImage
    extra = 1
    readonly_fields = ('image_url',)
    
    def image_url(self, instance):
        if instance.image:
            return instance.image.url
        return "-"

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'published', 'created', 'has_visualization']
    list_filter = ['published', 'created', 'has_visualization']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created'
    inlines = [BlogImageInline]
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}