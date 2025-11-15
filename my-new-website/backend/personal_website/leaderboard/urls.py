# my-new-website/backend/personal_website/leaderboard/urls.py
from django.urls import path
from . import views

app_name = 'leaderboard'

urlpatterns = [
    # This single path will handle GET and POST requests
    # e.g., GET /api/leaderboard/ or POST /api/leaderboard/
    path('', views.ScoreListCreateView.as_view(), name='score-list-create'),
]