#!/bin/bash

echo "🔄 Activating virtual environment..."
source venv/bin/activate

echo "📦 Applying migrations..."
python manage.py migrate

echo "🚀 Starting Django server at http://localhost:8000"
python manage.py runserver 0.0.0.0:8000
