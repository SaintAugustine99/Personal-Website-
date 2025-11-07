from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'blog'

# Creating a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'posts', views.BlogPostViewSet, basename='post')

# The API URLs should now automatically generate by the router.
urlpatterns = [
    path('', include(router.urls)),
]