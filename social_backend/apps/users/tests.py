from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(user_id='testuser', password='password123')
        self.assertEqual(user.user_id, 'testuser')
        self.assertTrue(user.check_password('password123'))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        user = User.objects.create_superuser(user_id='admin', password='password123')
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
class AuthAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/auth/register/'
        self.login_url = '/api/auth/login/'
        self.user_data = {
            'user_id': 'newuser',
            'password': 'password123',
            'pass_key': 'passkey123',
            'email': 'newuser@example.com',
            'name': 'New User'
        }

    def test_register_user(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(user_id='newuser').exists())

    def test_login_user(self):
        from django.contrib.auth.hashers import make_password
        user = User.objects.create_user(user_id='newuser', password='password123')
        user.pass_key = make_password('passkey123')
        user.save()
        
        response = self.client.post(self.login_url, {
            'user_id': 'newuser',
            'pass_key': 'passkey123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
