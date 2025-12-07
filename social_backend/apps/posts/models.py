from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class Post(models.Model):
    post_id = models.CharField(max_length=100, unique=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE)
    content = models.TextField(max_length=280, blank=True)
    repost_of = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='reposts')
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)  # Added index for sorting
    updated_at = models.DateTimeField(auto_now=True)
    repost_count = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['author', '-created_at']),  # Composite index for user posts
        ]

    def __str__(self):
        return f"{self.author.user_id}: {self.content[:20]}"

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes', db_index=True)  # Added index
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes', db_index=True)  # Added index
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.user_id} likes {self.post.post_id}"
