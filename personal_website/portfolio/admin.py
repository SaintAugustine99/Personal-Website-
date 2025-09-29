from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'order', 'created']
    list_filter = ['featured', 'created']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}