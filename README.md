# HRGenius - Comprehensive HRMS

A polished full-stack Human Resource Management academic project built with Django REST Framework, React, Vite, Bootstrap-ready styling and Recharts.

## Demo accounts

| Role | Username | Password |
|---|---|---|
| Admin | admin | Admin@123 |
| HR Manager | hrmanager | HR@123 |
| Employee | employee | Employee@123 |

Demo credentials are for local testing only.

## Quick start

### 1. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_demo
python manage.py runserver
```

The backend runs at `http://127.0.0.1:8000`.

> If your team has Python 3.11+, activate with `source .venv/bin/activate`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Database

SQLite is enabled by default so the project is easy to share and run. For MySQL 8.0 deployment, install `mysqlclient` or `PyMySQL`, set the optional values in `.env`, and update Django settings/environment loading in the deployment environment.

The Django migration system is the source of truth:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py seed_demo
```

## Implemented modules

Employee Management, Recruitment, Payroll, Attendance, Leave, Performance, Learning and Development, Benefits, Employee Self-Service records, Analytics, and Compliance have Django models, REST endpoints and React navigation/pages. Analytics values are generated from database records.

## API

Login:

```text
POST /api/auth/login/
POST /api/auth/refresh/
GET /api/auth/profile/
```

Main REST resources:

```text
/api/employees/
/api/departments/
/api/jobs/
/api/candidates/
/api/applications/
/api/payroll/
/api/attendance/
/api/leaves/
/api/reviews/
/api/training/
/api/enrollments/
/api/benefits/
/api/benefit-enrollments/
/api/documents/
/api/analytics/summary/
```

## Tests

```bash
cd backend
python manage.py check
pytest
```

```bash
cd frontend
npm run build
```

## Screenshots

The `Screenshots/` folder contains page captures for Home, Login, Admin Panel, HR Panel, Employee Panel and Legal pages. See `Screenshots/README.md` for the capture details.

## Sharing

Do not include `.venv`, `node_modules`, `.env`, database passwords or `db.sqlite3` in a team ZIP. This package includes setup instructions and a seed command to recreate demo data.
