from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Conversation, Message

User = get_user_model()

@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
class ChatAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(user_id='user1', password='password123')
        self.user2 = User.objects.create_user(user_id='user2', password='password123')
        self.client.force_authenticate(user=self.user1)
        
        # Create a conversation
        self.conversation = Conversation.objects.create()
        self.conversation.participants.add(self.user1, self.user2)
        
        self.message_url = f'/api/chat/{self.conversation.conversation_id}/messages/'

    def test_send_message(self):
        data = {'content': 'Hello user2'}
        response = self.client.post(self.message_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Message.objects.count(), 1)
        self.assertEqual(Message.objects.get().content, 'Hello user2')

    def test_get_messages(self):
        Message.objects.create(conversation=self.conversation, sender=self.user1, content='Test message')
        response = self.client.get(self.message_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
