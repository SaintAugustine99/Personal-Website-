from django.db import models

# Create your models here.
from django.db import models

class Score(models.Model):
    GAME_CHOICES = [
        ('snake', 'Snake'),
        ('asteroids', 'Asteroids'),
        ('other', 'Other'),
    ]

    player_name = models.CharField(max_length=50)
    score = models.IntegerField()
    game_name = models.CharField(max_length=20, choices=GAME_CHOICES)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score'] # Default ordering is highest score first

    def __str__(self):
        return f"{self.player_name} - {self.game_name}: {self.score}"