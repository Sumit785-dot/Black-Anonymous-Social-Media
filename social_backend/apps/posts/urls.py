from django.urls import path
from .views import PostListCreateView, PostDetailView, UserPostListView, RepostView, LikeView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('<str:post_id>/', PostDetailView.as_view(), name='post-detail'),
    path('user/<str:user_id>/', UserPostListView.as_view(), name='user-post-list'),
    path('<str:post_id>/repost/', RepostView.as_view(), name='post-repost'),
    path('<str:post_id>/like/', LikeView.as_view(), name='post-like'),
]
