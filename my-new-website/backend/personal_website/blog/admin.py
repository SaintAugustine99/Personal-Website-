from django.contrib import admin
from .models import BlogPost, Tag, ContentBlock, BlogUpdate

class ContentBlockInline(admin.StackedInline):
    model = ContentBlock
    extra = 1
    fields = ['block_type', 'order', 'text', 'image', 'image_caption', 'image_alt', 'link_url']

class BlogUpdateInline(admin.StackedInline):
    model = BlogUpdate
    extra = 0
    readonly_fields = ['created']

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'published', 'created']
    list_filter = ['published', 'created']
    search_fields = ['title']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created'
    inlines = [ContentBlockInline, BlogUpdateInline]

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
