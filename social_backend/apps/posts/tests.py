from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Post

User = get_user_model()

class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_id='poster',
            email='poster@example.com',
            name='Poster',
            password='password123'
        )

    def test_create_post(self):
        post = Post.objects.create(
            author=self.user,
            content='Hello World'
        )
        self.assertEqual(post.content, 'Hello World')
        self.assertEqual(post.author, self.user)
        self.assertIsNotNone(post.post_id)

    def test_post_length_validation(self):
        # Model validation isn't automatic on save, but we can check logic
        # Ideally we test serializer for validation
        pass

from rest_framework.test import APIClient
from rest_framework import status

class PostAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            user_id='poster',
            email='poster@example.com',
            name='Poster',
            password='password123'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_post_api(self):
        response = self.client.post('/api/posts/', {'content': 'New Post'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)

    def test_create_long_post_api(self):
        long_content = 'a' * 281
        response = self.client.post('/api/posts/', {'content': long_content})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
