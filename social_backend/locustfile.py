from locust import HttpUser, task, between
import random

class SocialUser(HttpUser):
    wait_time = between(1, 5)
    
    def on_start(self):
        self.user_id = f"user_{random.randint(1000, 99999)}"
        self.password = "password123"
        self.pass_key = "passkey123"
        
        # Register
        self.client.post("/api/auth/register/", json={
            "user_id": self.user_id,
            "name": "Load Test User",
            "password": self.password,
            "pass_key": self.pass_key
        })
        
        # Login
        response = self.client.post("/api/auth/login/", json={
            "user_id": self.user_id,
            "pass_key": self.pass_key
        })
        
        if response.status_code == 200:
            self.token = response.json().get("access")
            self.headers = {"Authorization": f"Bearer {self.token}"}
        else:
            self.token = None
            self.headers = {}

    @task(3)
    def view_feed(self):
        if self.token:
            self.client.get("/api/posts/", headers=self.headers)

    @task(1)
    def create_post(self):
        if self.token:
            self.client.post("/api/posts/", json={
                "content": "Load test post content"
            }, headers=self.headers)
            
    @task(2)
    def view_profile(self):
        if self.token:
            self.client.get("/api/auth/me/", headers=self.headers)
