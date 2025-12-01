from apps.users.models import User
from apps.chat.models import Conversation, Message
from django.utils import timezone
import uuid

# Get or create users
user1, _ = User.objects.get_or_create(
    user_id='testuser1',
    defaults={
        'email': 'test1@example.com',
        'name': 'Test User',
        'pass_key': 'pbkdf2_sha256$260000$test$hash'
    }
)

user2, _ = User.objects.get_or_create(
    user_id='alice',
    defaults={
        'email': 'alice@example.com',
        'name': 'Alice Johnson',
        'pass_key': 'pbkdf2_sha256$260000$test$hash'
    }
)

user3, _ = User.objects.get_or_create(
    user_id='bob',
    defaults={
        'email': 'bob@example.com',
        'name': 'Bob Smith',
        'pass_key': 'pbkdf2_sha256$260000$test$hash'
    }
)

# Create conversation 1: testuser1 and alice (active)
conv1 = Conversation.objects.create(
    conversation_id=str(uuid.uuid4()),
    initiator=user1,
    status='active'
)
conv1.participants.add(user1, user2)

# Add messages to conversation 1
Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv1,
    sender=user1,
    content="Hey Alice! How are you doing?",
    created_at=timezone.now() - timezone.timedelta(hours=2)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv1,
    sender=user2,
    content="Hi! I'm doing great, thanks for asking! How about you?",
    created_at=timezone.now() - timezone.timedelta(hours=1, minutes=50)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv1,
    sender=user1,
    content="I'm good too! Just working on this new project.",
    created_at=timezone.now() - timezone.timedelta(hours=1, minutes=45)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv1,
    sender=user2,
    content="That sounds exciting! What kind of project?",
    created_at=timezone.now() - timezone.timedelta(hours=1, minutes=30)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv1,
    sender=user1,
    content="It's a social media app with real-time chat features!",
    created_at=timezone.now() - timezone.timedelta(minutes=30)
)

# Create conversation 2: testuser1 and bob (active)
conv2 = Conversation.objects.create(
    conversation_id=str(uuid.uuid4()),
    initiator=user3,
    status='active'
)
conv2.participants.add(user1, user3)

# Add messages to conversation 2
Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv2,
    sender=user3,
    content="Hey! Long time no see!",
    created_at=timezone.now() - timezone.timedelta(days=1)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv2,
    sender=user1,
    content="Bob! Yeah, it's been a while. How have you been?",
    created_at=timezone.now() - timezone.timedelta(hours=20)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv2,
    sender=user3,
    content="Pretty good! Want to grab coffee sometime?",
    created_at=timezone.now() - timezone.timedelta(hours=5)
)

Message.objects.create(
    message_id=str(uuid.uuid4()),
    conversation=conv2,
    sender=user1,
    content="Sure! How about tomorrow afternoon?",
    created_at=timezone.now() - timezone.timedelta(minutes=10)
)

print("✅ Created 2 active conversations with messages!")
print(f"Conversation 1: {user1.user_id} ↔ {user2.user_id} ({conv1.messages.count()} messages)")
print(f"Conversation 2: {user1.user_id} ↔ {user3.user_id} ({conv2.messages.count()} messages)")
