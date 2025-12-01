from django.core.management.base import BaseCommand
from pymongo import ASCENDING, DESCENDING, TEXT
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Create database indexes for better performance'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]

        self.stdout.write('Creating indexes...')

        # Users Collection Indexes
        db.users_user.create_index([("user_id", ASCENDING)], unique=True, name="idx_user_id")
        db.users_user.create_index([("email", ASCENDING)], unique=True, name="idx_email")
        db.users_user.create_index([("name", TEXT)], name="idx_name_text")
        self.stdout.write(self.style.SUCCESS('✓ Users indexes created'))

        # Posts Collection Indexes
        db.posts_post.create_index([("author_id", ASCENDING), ("created_at", DESCENDING)], name="idx_author_created")
        db.posts_post.create_index([("created_at", DESCENDING)], name="idx_created_desc")
        db.posts_post.create_index([("content", TEXT)], name="idx_content_text")
        self.stdout.write(self.style.SUCCESS('✓ Posts indexes created'))

        # Follows Collection Indexes
        db.users_follow.create_index([("follower_id", ASCENDING), ("following_id", ASCENDING)], unique=True, name="idx_follow_unique")
        db.users_follow.create_index([("following_id", ASCENDING)], name="idx_following")
        db.users_follow.create_index([("follower_id", ASCENDING)], name="idx_follower")
        self.stdout.write(self.style.SUCCESS('✓ Follows indexes created'))

        # Likes Collection Indexes
        db.posts_like.create_index([("user_id", ASCENDING), ("post_id", ASCENDING)], unique=True, name="idx_like_unique")
        db.posts_like.create_index([("post_id", ASCENDING)], name="idx_post_likes")
        self.stdout.write(self.style.SUCCESS('✓ Likes indexes created'))

        self.stdout.write(self.style.SUCCESS('\n✅ All indexes created successfully!'))
        
        # Show all indexes
        self.stdout.write('\nIndexes summary:')
        for collection_name in ['users_user', 'posts_post', 'users_follow', 'posts_like']:
            indexes = db[collection_name].list_indexes()
            self.stdout.write(f'\n{collection_name}:')
            for idx in indexes:
                self.stdout.write(f"  - {idx['name']}")
