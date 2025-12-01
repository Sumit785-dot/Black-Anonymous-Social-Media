from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    post_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'user_id', 'name', 'bio', 'profile_photo', 'date_joined', 
                  'follower_count', 'following_count', 'post_count', 'is_following')
        read_only_fields = ('id', 'date_joined')

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_post_count(self, obj):
        from apps.posts.models import Post
        return Post.objects.filter(author=obj).count()

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            from apps.users.models import Follow
            return Follow.objects.filter(follower=request.user, following=obj).exists()
        return False

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    pass_key = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('user_id', 'name', 'password', 'pass_key')

    def create(self, validated_data):
        # Extract pass_key before creating user
        pass_key = validated_data.pop('pass_key')
        
        # Create user without pass_key
        user = User.objects.create_user(
            user_id=validated_data['user_id'],
            password=validated_data['password'],
            name=validated_data['name']
        )
        
        # Hash and set pass_key
        from django.contrib.auth.hashers import make_password
        user.pass_key = make_password(pass_key)
        user.save()
        return user
