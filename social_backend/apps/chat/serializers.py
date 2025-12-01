from rest_framework import serializers
from .models import Conversation, Message
from apps.users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    is_me = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ('message_id', 'conversation', 'sender', 'content', 'created_at', 'is_read', 'is_me')
        read_only_fields = ('message_id', 'conversation', 'sender', 'created_at', 'is_read')

    def get_is_me(self, obj):
        request = self.context.get('request')
        if request and request.user:
            return obj.sender == request.user
        return False

class ConversationSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ('conversation_id', 'participants', 'status', 'initiator', 'created_at', 'updated_at', 'last_message')

    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-created_at').first()
        if last_msg:
            return MessageSerializer(last_msg, context=self.context).data
        return None
