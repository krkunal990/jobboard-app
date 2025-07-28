# 🧑‍💼 Job Portal App

A full-stack job portal application where recruiters can post jobs and view applicants, and job seekers can search and apply for jobs with resume uploads.

---

## 🔧 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Resume support via backend
- **UI Enhancements**: Responsive design, Dark/Cream mode toggle, Hover animations

---

## ⚙️ Features

### 🔐 Authentication
- JWT-based login/signup
- Role-based access: `recruiter` and `applicant`
- Persistent auth using `localStorage`

### 👤 Applicant Features
- 🔎 View All Jobs
- 📝 Apply to jobs with resume upload
- 📄 My Applications (with resume view/download)
- ⛅ Dark/Cream mode toggle

### 🧑‍💼 Recruiter Features
- ➕ Post a new job
- 📋 View applications to posted jobs
- 🗃️ View own posted jobs
- 🔍 Suggestions panel:
  - Resume download counts
  - View applications per job
  - Filter by status/date
  - Pagination & export options

### 💡 UI/UX
- Fully responsive (mobile, tablet, desktop)
- Smooth hover effects and transitions
- Dark mode & Light Cream mode toggle
- Logout with redirect to `/signin`
- Toasts & error display (form feedback)

---

## 🚀 Setup Instructions

### 1️⃣ Backend (Django)

```bash
git clone <repo-url>
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create a superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
# Placeholder for README.md
