from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

User = get_user_model()

class ConversationListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ConversationSerializer

    def get_queryset(self):
        return self.request.user.conversations.all().order_by('-updated_at')

    def post(self, request, *args, **kwargs):
        target_user_id = request.data.get('user_id')
        if not target_user_id:
            return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            target_user = User.objects.get(user_id=target_user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        if target_user == request.user:
            return Response({"error": "Cannot chat with yourself"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if conversation already exists
        # This is a bit tricky with ManyToMany. 
        # We want a conversation where participants are EXACTLY [user, target_user]
        # For 1-on-1 chats, we can check if there's a conversation with both users.
        
        # Simple approach: Filter conversations containing user, then filter those containing target_user
        conversations = Conversation.objects.filter(participants=request.user).filter(participants=target_user)
        
        if conversations.exists():
            conversation = conversations.first()
            return Response(ConversationSerializer(conversation, context={'request': request}).data)

        # Create new conversation
        conversation = Conversation.objects.create(
            initiator=request.user,
            status='pending'
        )
        conversation.participants.add(request.user, target_user)
        
        return Response(ConversationSerializer(conversation, context={'request': request}).data, status=status.HTTP_201_CREATED)

class ConversationDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ConversationSerializer
    lookup_field = 'conversation_id'

    def get_queryset(self):
        return self.request.user.conversations.all()

    def patch(self, request, *args, **kwargs):
        conversation = self.get_object()
        status_update = request.data.get('status')
        
        if status_update == 'active':
            # Only the non-initiator can accept
            if conversation.initiator == request.user:
                 return Response({"error": "You cannot accept your own request"}, status=status.HTTP_400_BAD_REQUEST)
            
            conversation.status = 'active'
            conversation.save()
            return Response(ConversationSerializer(conversation, context={'request': request}).data)
            
        return super().patch(request, *args, **kwargs)

class MessageListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = MessageSerializer

    def get_queryset(self):
        conversation_id = self.kwargs.get('conversation_id')
        return Message.objects.filter(conversation__conversation_id=conversation_id).order_by('created_at')

    def perform_create(self, serializer):
        conversation_id = self.kwargs.get('conversation_id')
        conversation = Conversation.objects.get(conversation_id=conversation_id)
        
        # Verify user is a participant
        if self.request.user not in conversation.participants.all():
            raise permissions.PermissionDenied("You are not a participant in this conversation")

        serializer.save(sender=self.request.user, conversation=conversation)
        
        # Update conversation updated_at
        conversation.save()
