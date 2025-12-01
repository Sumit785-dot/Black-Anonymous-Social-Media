from django.urls import path
from .views import RegisterView, LoginView, UserProfileView, UserSearchView, UserDetailView, FollowToggleView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('me/', UserProfileView.as_view(), name='me'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('search/', UserSearchView.as_view(), name='user-search'),
    path('users/<str:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('users/<str:user_id>/follow/', FollowToggleView.as_view(), name='follow-toggle'),
]
