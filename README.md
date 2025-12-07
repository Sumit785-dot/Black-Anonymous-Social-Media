# Social Media Application

A full-stack, Twitter-like social media application built with Django (Backend) and React (Frontend).

## Features
- **Authentication**: Secure registration and login with JWT.
- **Feed**: View posts from all users.
- **Posting**: Create text-based posts.
- **Chat**: Real-time messaging (API ready).
- **Profile**: View user profiles and post history.
- **Monitoring**: Integrated with Sentry for error tracking.
- **Documentation**: Swagger UI for API exploration.

## Tech Stack
- **Backend**: Python 3.11, Django 5, Django REST Framework.
- **Frontend**: React 18, React Router, Axios.
- **Database**: SQLite (Dev), PostgreSQL (Prod ready).
- **Containerization**: Docker, Docker Compose.

## Prerequisites
- Docker & Docker Compose OR
- Python 3.11+ & Node.js 18+

## Quick Start (Docker)

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd social-media-app
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and Run**:
   ```bash
   docker-compose up --build
   ```

4. **Access the App**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8000/api/
   - API Docs: http://localhost:8000/api/schema/swagger-ui/

## Manual Setup (Development)

### Backend
1. `cd social_backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

### Frontend
1. `cd social_frontend`
2. `npm install`
3. `npm start`

## Testing
- **Backend**: `cd social_backend && python manage.py test`
- **Frontend**: `cd social_frontend && npm test`
- **E2E**: `cd social_frontend && npx playwright test`
