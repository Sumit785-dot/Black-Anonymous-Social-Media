# Deployment Guide

This guide covers deploying the Social Media Application to a production environment.

## Deployment Options

### 1. Docker (Recommended for VPS)
The easiest way to deploy is using Docker Compose on a VPS (e.g., DigitalOcean, AWS EC2, Linode).

1. **Provision a Server**: Ubuntu 22.04 LTS recommended.
2. **Install Docker**: Follow official Docker installation guide.
3. **Clone Repo**: Clone your repository to the server.
4. **Configure Env**: Create `.env` from `.env.example` and set production values:
   - `DEBUG=0`
   - `SECRET_KEY=<generate-secure-key>`
   - `ALLOWED_HOSTS=<your-domain>`
   - `SENTRY_DSN=<your-sentry-dsn>`
5. **Run**: `docker-compose up -d --build`

### 2. Platform-as-a-Service (Render/Heroku)

#### Backend (Render)
1. Create a **Web Service**.
2. Connect GitHub repo.
3. **Build Command**: `pip install -r social_backend/requirements.txt`
4. **Start Command**: `gunicorn social_backend.config.wsgi:application`
5. **Environment Variables**: Set all required variables from `.env.example`.

#### Frontend (Render/Vercel/Netlify)
1. Create a **Static Site**.
2. Connect GitHub repo.
3. **Build Command**: `cd social_frontend && npm install && npm run build`
4. **Publish Directory**: `social_frontend/build`
5. **Environment Variables**: `REACT_APP_API_URL=<your-backend-url>`

## Post-Deployment Checklist
- [ ] Run database migrations (`python manage.py migrate`).
- [ ] Create a superuser (`python manage.py createsuperuser`).
- [ ] Verify SSL/HTTPS is active.
- [ ] Check Sentry for any startup errors.
