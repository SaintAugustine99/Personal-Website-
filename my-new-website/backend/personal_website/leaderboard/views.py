from django.shortcuts import render

# Create your views here.
# my-new-website/backend/personal_website/leaderboard/views.py
from rest_framework import generics, permissions
from .models import Score
from .serializers import ScoreSerializer

class ScoreListCreateView(generics.ListCreateAPIView):
    """
    API endpoint to:
    1. GET: List the top 100 scores for a game.
    2. POST: Submit a new score.
    """
    serializer_class = ScoreSerializer
    permission_classes = [permissions.AllowAny] # Anyone can view or submit scores

    def get_queryset(self):
        """
        Filter scores by game.
        e.g., /api/leaderboard/?game=snake
        """
        queryset = Score.objects.all()
        game_name = self.request.query_params.get('game', None)
        if game_name is not None:
            queryset = queryset.filter(game_name=game_name)
        
        # Return only the top 100 scores
        return queryset.order_by('-score')[:100]