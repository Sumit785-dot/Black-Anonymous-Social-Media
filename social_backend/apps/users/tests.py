from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            user_id='testuser',
            email='test@example.com',
            name='Test User',
            password='password123'
        )

    def test_create_user(self):
        self.assertEqual(self.user.user_id, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('password123'))

    def test_create_superuser(self):
        admin = User.objects.create_superuser(
            user_id='admin',
            email='admin@example.com',
            name='Admin User',
            password='password123'
        )
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)

class UserAuthTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'user_id': 'newuser',
            'email': 'new@example.com',
            'name': 'New User',
            'password': 'password123'
        }
        self.user = User.objects.create_user(
            user_id='existing',
            email='existing@example.com',
            name='Existing User',
            password='password123'
        )

    def test_registration(self):
        response = self.client.post('/api/auth/register/', self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(user_id='newuser').exists())

    def test_login(self):
        response = self.client.post('/api/auth/login/', {
            'user_id': 'existing',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
