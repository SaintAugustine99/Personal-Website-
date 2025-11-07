from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

# This replaces both ProjectListView and ProjectDetailView
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows projects to be viewed.
    """
    queryset = Project.objects.all().order_by('order', '-created')
    serializer_class = ProjectSerializer
    lookup_field = 'slug'