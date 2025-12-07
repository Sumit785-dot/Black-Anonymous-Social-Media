from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Count, Exists, OuterRef
from .models import Post, Like
from .serializers import PostSerializer

from .pagination import StandardResultsSetPagination

User = get_user_model()

class PostListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        # Optimize with select_related, prefetch_related, and annotate counts
        # This eliminates N+1 queries by calculating counts in database
        return Post.objects.select_related(
            'author', 
            'repost_of__author'
        ).prefetch_related(
            'likes'
        ).annotate(
            calculated_like_count=Count('likes', distinct=True),
            calculated_repost_count=Count('reposts', distinct=True),
            is_liked=Exists(Like.objects.filter(post=OuterRef('pk'), user=self.request.user)),
            is_reposted=Exists(Post.objects.filter(repost_of=OuterRef('pk'), author=self.request.user))
        ).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'post_id'

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        if post.author != request.user:
            return Response({"error": "You can only delete your own posts"}, status=status.HTTP_403_FORBIDDEN)
        return super().delete(request, *args, **kwargs)

class UserPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Post.objects.none()
        
        # Optimize with select_related, prefetch_related, and annotate counts
        return Post.objects.filter(author=user).select_related(
            'author', 
            'repost_of__author'
        ).prefetch_related(
            'likes'
        ).annotate(
            calculated_like_count=Count('likes', distinct=True),
            calculated_repost_count=Count('reposts', distinct=True),
            is_liked=Exists(Like.objects.filter(post=OuterRef('pk'), user=self.request.user)),
            is_reposted=Exists(Post.objects.filter(repost_of=OuterRef('pk'), author=self.request.user))
        ).order_by('-created_at')

class RepostView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Post.objects.all()
    lookup_field = 'post_id'

    def post(self, request, post_id):
        try:
            original_post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        # Prevent reposting a repost (optional, but good for simplicity)
        if original_post.repost_of:
            original_post = original_post.repost_of

        # Check if already reposted
        existing_repost = Post.objects.filter(author=request.user, repost_of=original_post).first()
        if existing_repost:
            return Response({"error": "You have already reposted this"}, status=status.HTTP_400_BAD_REQUEST)

        # Create repost
        # Create repost
        repost = Post.objects.create(
            author=request.user,
            repost_of=original_post,
            content=request.data.get('content', "")
        )
        
        # Increment count
        original_post.repost_count += 1
        original_post.save()

        return Response(PostSerializer(repost, context={'request': request}).data, status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        try:
            original_post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if original_post.repost_of:
             original_post = original_post.repost_of

        # Find the repost by this user
        repost = Post.objects.filter(author=request.user, repost_of=original_post).first()
        if not repost:
            return Response({"error": "You have not reposted this"}, status=status.HTTP_400_BAD_REQUEST)

        repost.delete()
        
        # Decrement count
        original_post.repost_count = max(0, original_post.repost_count - 1)
        original_post.save()

        return Response({"message": "Un-reposted successfully"}, status=status.HTTP_200_OK)

class LikeView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Post.objects.all()
    lookup_field = 'post_id'

    def post(self, request, post_id):
        try:
            post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        from .models import Like
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        
        if not created:
             return Response({"error": "You have already liked this post"}, status=status.HTTP_400_BAD_REQUEST)

        post.like_count += 1
        post.save()
        
        return Response({"message": "Liked successfully"}, status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        try:
            post = Post.objects.get(post_id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        from .models import Like
        like = Like.objects.filter(user=request.user, post=post).first()
        if not like:
            return Response({"error": "You have not liked this post"}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()
        post.like_count = max(0, post.like_count - 1)
        post.save()

        return Response({"message": "Unliked successfully"}, status=status.HTTP_200_OK)
