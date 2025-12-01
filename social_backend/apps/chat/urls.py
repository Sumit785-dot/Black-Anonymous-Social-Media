from django.urls import path
from .views import ConversationListCreateView, MessageListCreateView, ConversationDetailView

urlpatterns = [
    path('', ConversationListCreateView.as_view(), name='conversation-list-create'),
    path('<str:conversation_id>/', ConversationDetailView.as_view(), name='conversation-detail'),
    path('<str:conversation_id>/messages/', MessageListCreateView.as_view(), name='message-list-create'),
]
