FROM docker.io/python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc python3-dev libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

# Copy the backend code
COPY . /app/

# Expose port 8000
EXPOSE 8000

# Run the Django app with gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
