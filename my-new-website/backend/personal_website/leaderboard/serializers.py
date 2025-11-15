# my-new-website/backend/personal_website/leaderboard/serializers.py
from rest_framework import serializers
from .models import Score

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ['id', 'player_name', 'score', 'game_name', 'created']
        read_only_fields = ['created', 'id'] # We only want to receive name, score, and game