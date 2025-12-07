from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post

User = get_user_model()

@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(user_id='testuser', password='password123')
        self.post = Post.objects.create(author=self.user, content='Test content')

    def test_post_creation(self):
        self.assertEqual(self.post.content, 'Test content')
        self.assertEqual(self.post.author.user_id, 'testuser')
        self.assertEqual(self.post.like_count, 0)

@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
class PostAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(user_id='testuser', password='password123')
        self.client.force_authenticate(user=self.user)
        self.create_url = '/api/posts/'
        self.list_url = '/api/posts/'

    def test_create_post(self):
        data = {'content': 'New post content'}
        response = self.client.post(self.create_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().content, 'New post content')

    def test_get_feed(self):
        Post.objects.create(author=self.user, content='Feed post')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Depending on pagination, results might be in 'results' key or direct list
        # Assuming standard DRF pagination or list
        if 'results' in response.data:
            self.assertTrue(len(response.data['results']) > 0)
        else:
            self.assertTrue(len(response.data) > 0)
