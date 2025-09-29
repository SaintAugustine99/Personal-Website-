from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Project

class ProjectListView(ListView):
    model = Project
    template_name = 'portfolio/project_list.html'
    context_object_name = 'object_list'
    
    def get_queryset(self):
        return Project.objects.all().order_by('order', '-created')

class ProjectDetailView(DetailView):
    model = Project
    template_name = 'portfolio/project_detail.html'
    context_object_name = 'project'