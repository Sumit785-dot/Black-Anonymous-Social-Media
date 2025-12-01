from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import check_password
from django.db import models
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user_id = request.data.get('user_id')
        pass_key = request.data.get('pass_key')

        if not user_id or not pass_key:
            return Response({'error': 'Please provide both user_id and pass_key'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Verify pass_key
        if not check_password(pass_key, user.pass_key):
             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UserSearchView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if not query:
            return User.objects.none()
        return User.objects.filter(
            models.Q(user_id__icontains=query) | 
            models.Q(name__icontains=query)
        )[:20]

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    lookup_field = 'user_id'
    
    def get_queryset(self):
        return User.objects.all()

class FollowToggleView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, user_id):
        try:
            target_user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if target_user == request.user:
            return Response({"error": "Cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
        
        from apps.users.models import Follow
        follow, created = Follow.objects.get_or_create(
            follower=request.user,
            following=target_user
        )
        
        if created:
            return Response({"message": "Followed successfully", "is_following": True}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Already following", "is_following": True})
    
    def delete(self, request, user_id):
        try:
            target_user = User.objects.get(user_id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        from apps.users.models import Follow
        deleted_count, _ = Follow.objects.filter(
            follower=request.user,
            following=target_user
        ).delete()
        
        if deleted_count > 0:
            return Response({"message": "Unfollowed successfully", "is_following": False})
        else:
            return Response({"message": "Not following", "is_following": False})

