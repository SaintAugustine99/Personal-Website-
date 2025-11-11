# my-new-website/backend/personal_website/contact/urls.py
from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    # This single path will handle the POST request to /api/contact/
    path('', views.ContactMessageCreateView.as_view(), name='contact-api'),
]