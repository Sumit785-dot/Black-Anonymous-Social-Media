from apps.users.models import User
from apps.posts.models import Post
from django.utils import timezone
import uuid

# Get users
testuser1 = User.objects.get(user_id='testuser1')
sumit = User.objects.get(user_id='alice')
anand = User.objects.get(user_id='bob')

# Create posts for testuser1
posts_data = [
    ("Just finished setting up this awesome social media app! 🚀", 3),
    ("The chat feature is working perfectly. Try messaging me!", 2),
    ("Having a great day coding! Anyone else working on cool projects?", 1),
    ("Love the clean black and white theme of this app 🖤🤍", 0.5),
]

for content, hours_ago in posts_data:
    Post.objects.create(
        post_id=str(uuid.uuid4()),
        author=testuser1,
        content=content,
        created_at=timezone.now() - timezone.timedelta(hours=hours_ago)
    )

# Create posts for Sumit
Post.objects.create(
    post_id=str(uuid.uuid4()),
    author=sumit,
    content="Hey everyone! Excited to be here on this platform!",
    created_at=timezone.now() - timezone.timedelta(hours=5)
)

Post.objects.create(
    post_id=str(uuid.uuid4()),
    author=sumit,
    content="This chat feature is amazing! Great work @testuser1",
    created_at=timezone.now() - timezone.timedelta(hours=1)
)

# Create posts for Anand
Post.objects.create(
    post_id=str(uuid.uuid4()),
    author=anand,
    content="Just joined! Looking forward to connecting with everyone.",
    created_at=timezone.now() - timezone.timedelta(hours=4)
)

Post.objects.create(
    post_id=str(uuid.uuid4()),
    author=anand,
    content="The UI design is so clean and minimal. Love it!",
    created_at=timezone.now() - timezone.timedelta(minutes=45)
)

print(f"✅ Created {Post.objects.filter(author=testuser1).count()} posts for @testuser1")
print(f"✅ Created {Post.objects.filter(author=sumit).count()} posts for Sumit (@alice)")
print(f"✅ Created {Post.objects.filter(author=anand).count()} posts for Anand (@bob)")
print(f"\n📊 Total posts in database: {Post.objects.count()}")
