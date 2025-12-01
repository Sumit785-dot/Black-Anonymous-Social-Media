from rest_framework import serializers
from .models import Post
from .models import Post
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'name', 'profile_photo')

class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_liked = serializers.SerializerMethodField()
    is_reposted = serializers.SerializerMethodField()
    repost_of = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('post_id', 'author', 'content', 'created_at', 'repost_count', 'like_count', 'is_liked', 'is_reposted', 'repost_of')
        read_only_fields = ('post_id', 'created_at', 'repost_count', 'like_count', 'repost_of')

    def validate_content(self, value):
        if len(value) > 280:
            raise serializers.ValidationError("Content cannot exceed 280 characters.")
        return value

    def get_repost_of(self, obj):
        if obj.repost_of:
            return PostSerializer(obj.repost_of, context=self.context).data
        return None

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

    def get_is_reposted(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check if user has reposted THIS post
            return Post.objects.filter(author=request.user, repost_of=obj).exists()
        return False
