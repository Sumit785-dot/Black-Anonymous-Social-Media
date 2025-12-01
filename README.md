# Social Media Application

A Twitter-like social media application built with React (Frontend), Django REST Framework (Backend), and MongoDB. The application features a strict black and white theme.

## Features

- **User Authentication**: Register and Login with custom User ID and Pass Key. JWT-based authentication.
- **User Profiles**: View user profiles, post counts, follower/following counts.
- **Follow System**: Follow and unfollow users. View followers and following lists.
- **Feed**: Personalized feed showing posts from yourself and users you follow, ordered by newest first. Pagination included.
- **Posts**: Create text-only posts (max 280 characters). Delete your own posts.
- **Interactions**:
    - **Repost**: Repost other users' content.
    - **Like**: Like and unlike posts.
- **Search**: Search for users by name or User ID.
- **Responsive Design**: Mobile-friendly layout with a persistent sidebar navigation.

## Tech Stack

- **Frontend**: React, Axios, React Router DOM
- **Backend**: Django, Django REST Framework, Djongo (MongoDB connector), SimpleJWT
- **Database**: MongoDB

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- MongoDB instance (local or Atlas)

### Backend Setup

1.  Navigate to `social_backend`:
    ```bash
    cd social_backend
    ```
2.  Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure Environment Variables:
    - Create a `.env` file in `social_backend/` with the following:
      ```
      SECRET_KEY=your_secret_key
      DEBUG=True
      ALLOWED_HOSTS=localhost,127.0.0.1
      MONGODB_NAME=social_db
      MONGODB_HOST=localhost
      MONGODB_PORT=27017
      ```
5.  Run Migrations:
    ```bash
    python manage.py migrate
    ```
6.  Start the server:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1.  Navigate to `social_frontend`:
    ```bash
    cd social_frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    The app will run at `http://localhost:3000`.

## API Endpoints

- **Auth**:
    - `POST /api/auth/register/`: Register a new user.
    - `POST /api/auth/login/`: Login and get JWT tokens.
    - `GET /api/auth/profile/`: Get current user profile.
    - `GET /api/auth/users/<user_id>/`: Get specific user profile.
    - `GET /api/auth/search/?search=<query>`: Search users.
    - `POST /api/auth/users/<user_id>/follow/`: Follow a user.
    - `DELETE /api/auth/users/<user_id>/follow/`: Unfollow a user.

- **Posts**:
    - `GET /api/posts/`: Get feed posts (paginated).
    - `POST /api/posts/`: Create a new post.
    - `DELETE /api/posts/<post_id>/`: Delete a post.
    - `POST /api/posts/<post_id>/repost/`: Repost a post.
    - `DELETE /api/posts/<post_id>/repost/`: Remove a repost.
    - `POST /api/posts/<post_id>/like/`: Like a post.
    - `DELETE /api/posts/<post_id>/like/`: Unlike a post.

## License

MIT
