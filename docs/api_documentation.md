# HRGenius API Documentation

Authentication uses JWT bearer tokens.

## Authentication

- `POST /api/auth/login/`
- `POST /api/auth/refresh/`
- `GET /api/auth/profile/`
- `PATCH /api/auth/profile/`

## Resources

- Departments: `/api/departments/`
- Designations: `/api/designations/`
- Employees: `/api/employees/`
- Job openings: `/api/jobs/`
- Candidates: `/api/candidates/`
- Applications: `/api/applications/`
- Payroll: `/api/payroll/`
- Attendance: `/api/attendance/`
- Leave: `/api/leaves/`
- Goals: `/api/goals/`
- Performance reviews: `/api/reviews/`
- Training: `/api/training/`
- Training enrollments: `/api/enrollments/`
- Benefits: `/api/benefits/`
- Benefit enrollments: `/api/benefit-enrollments/`
- Compliance documents: `/api/documents/`
- Live analytics: `/api/analytics/summary/`

Standard operations are `GET`, `POST`, `PATCH`, `PUT` and `DELETE` where supported. Search, filtering and pagination are enabled by Django REST Framework.
