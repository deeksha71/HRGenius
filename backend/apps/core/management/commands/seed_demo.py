from datetime import date, timedelta
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from apps.core.models import *


class Command(BaseCommand):
    help = 'Load realistic HRGenius demo data'

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@hrgenius.local', 'Admin@123', role='ADMIN', first_name='Aarav', last_name='Sharma')
            User.objects.create_user('hrmanager', 'hr@hrgenius.local', 'HR@123', role='HR', first_name='Meera', last_name='Kapoor')
            User.objects.create_user('employee', 'employee@hrgenius.local', 'Employee@123', role='EMPLOYEE', first_name='Rohan', last_name='Mehta')

        dept_data = [
            ('Engineering','ENG','Product engineering and architecture'),
            ('Human Resources','HR','People operations and talent'),
            ('Finance','FIN','Finance and accounting'),
            ('Marketing','MKT','Brand and growth'),
            ('Sales','SAL','Revenue and partnerships'),
            ('Operations','OPS','Business operations'),
            ('Customer Success','CS','Customer support and success'),
        ]
        departments = []
        for name, code, desc in dept_data:
            dept, _ = Department.objects.get_or_create(code=code, defaults={'name': name, 'description': desc})
            departments.append(dept)

        designations = []
        titles = ['Software Engineer','Senior Analyst','Manager','Executive','Team Lead','Specialist','Consultant']
        for dept in departments:
            for title in titles[:4]:
                des, _ = Designation.objects.get_or_create(title=title, department=dept)
                designations.append(des)

        first_names = ['Aarav','Vivaan','Aditya','Rohan','Arjun','Ishaan','Krishna','Kabir','Ananya','Diya','Saanvi','Aarohi','Ishita','Meera','Navya','Kavya','Riya','Myra']
        last_names = ['Sharma','Verma','Gupta','Mehta','Iyer','Reddy','Singh','Kapoor','Joshi','Malhotra','Das','Patel','Bhat','Nair']
        cities = ['Bengaluru','Delhi','Mumbai','Hyderabad','Pune','Chennai','Kolkata','Ahmedabad','Jaipur','Noida']
        if Employee.objects.count() < 24:
            for i in range(24):
                dept = departments[i % len(departments)]
                des = next((d for d in designations if d.department == dept), designations[0])
                Employee.objects.create(
                    employee_id=f'HRG-{2024+i}',
                    first_name=first_names[i % len(first_names)],
                    last_name=last_names[(i * 3) % len(last_names)],
                    email=f'employee{i+1}@hrgenius.in',
                    phone=f'+91 98{1000000+i}',
                    gender='Female' if i % 3 == 0 else 'Male',
                    date_of_birth=date(1990 + i % 12, 1 + i % 10, 1 + i % 28),
                    date_of_joining=date(2024, 1 + i % 12, 1 + i % 27),
                    department=dept,
                    designation=des,
                    city=cities[i % len(cities)],
                    address=f'{i+12}, {cities[i % len(cities)]}, India',
                    basic_salary=42000 + i * 1750,
                    status='Inactive' if i in (20, 22) else 'Active',
                )

        employees = list(Employee.objects.all())
        employee_user = User.objects.filter(username='employee').first()
        demo_employee = next((employee for employee in employees if employee.first_name == 'Rohan'), employees[0])
        if employee_user and not demo_employee.user:
            demo_employee.user = employee_user
            demo_employee.save(update_fields=['user'])
        for i, employee in enumerate(employees):
            month = date(2026, 1 + i % 10, 1)
            basic = employee.basic_salary
            hra = basic * Decimal('0.20')
            allowances = basic * Decimal('0.10')
            deductions = basic * Decimal('0.08')
            Payroll.objects.get_or_create(
                employee=employee, month=month,
                defaults={'basic':basic,'hra':hra,'allowances':allowances,'deductions':deductions,'net_salary':basic+hra+allowances-deductions}
            )
            Attendance.objects.get_or_create(
                employee=employee, date=date(2026,10,1+i%20),
                defaults={'check_in':'09:30','check_out':'18:15','status':'Present' if i%7 else 'Half-day'}
            )

        if JobOpening.objects.count() == 0:
            for i, title in enumerate(['Frontend Developer','Backend Developer','HR Executive','Financial Analyst','Marketing Lead','Customer Success Associate']):
                JobOpening.objects.create(title=title, department=departments[i % len(departments)], location=cities[i], positions=2+i%3, description=f'Join our {title} team and make an impact.', status='Open' if i < 5 else 'Closed')

        if Candidate.objects.count() == 0:
            jobs = list(JobOpening.objects.all())
            for i in range(18):
                candidate = Candidate.objects.create(name=f'{first_names[i % len(first_names)]} {last_names[i % len(last_names)]}', email=f'candidate{i+1}@gmail.com', phone=f'+91 97{1000000+i}', city=cities[i % len(cities)])
                Application.objects.create(candidate=candidate, job=jobs[i % len(jobs)], status=['Applied','Shortlisted','Interview','Selected','Rejected'][i % 5])

        if Leave.objects.count() == 0:
            for i, employee in enumerate(employees[:12]):
                Leave.objects.create(employee=employee, leave_type=['Casual','Sick','Earned'][i%3], start_date=date(2026,11,1+i%10), end_date=date(2026,11,2+i%10), reason='Personal planning / health and wellbeing', status=['Pending','Approved','Rejected'][i%3])

        if PerformanceReview.objects.count() == 0:
            reviewer = User.objects.filter(role__in=['ADMIN', 'HR']).first()
            if reviewer:
                feedback = [
                    'Consistently delivers quality work and collaborates effectively.',
                    'Shows strong ownership and improvement in quarterly goals.',
                    'Demonstrates good technical skills and reliable team communication.',
                    'Meets performance expectations and supports colleagues.',
                ]
                for i, employee in enumerate(employees[:10]):
                    PerformanceReview.objects.create(
                        employee=employee,
                        reviewer=reviewer,
                        period=['Q1 2026','Q2 2026','Q3 2026','Q4 2026'][i % 4],
                        rating=['4.5','4.2','3.8','4.0','4.6','3.9','4.3','4.1','4.4','4.0'][i],
                        feedback=feedback[i % len(feedback)],
                    )

        if Training.objects.count() == 0:
            training_titles = ['Leadership Essentials','Python for Data','Workplace Ethics','Advanced Excel','Cybersecurity Awareness','React Development']
            for i, title in enumerate(training_titles):
                training = Training.objects.create(title=title, category=['Management','Technical','Compliance'][i%3], duration_hours=8+i*2)
                for employee in employees[i:i+8]:
                    TrainingEnrollment.objects.create(employee=employee, training=training, progress=100 if i%2 == 0 else 45+i*3, status='Completed' if i%2 == 0 else 'In Progress')

        if Benefit.objects.count() == 0:
            benefits = [('Health Insurance','Insurance','Comprehensive family health coverage','Acko'),('Provident Fund','Retirement','Employer and employee PF contribution','EPFO'),('Health Checkup','Wellness','Annual preventive health checkup','Apollo'),('Meal Allowance','Allowance','Monthly meal card benefit','Sodexo')]
            for name, kind, desc, provider in benefits:
                benefit = Benefit.objects.create(name=name, benefit_type=kind, description=desc, provider=provider)
                for employee in employees[:16]:
                    BenefitEnrollment.objects.create(employee=employee, benefit=benefit, start_date=date(2026,1,1), status='Active')

        if ComplianceDocument.objects.count() == 0:
            for i, employee in enumerate(employees):
                ComplianceDocument.objects.create(employee=employee, title='PAN Card', document_type='Identity', expiry_date=None, status='Verified')
                ComplianceDocument.objects.create(employee=employee, title='Employment Contract', document_type='Contract', expiry_date=date(2026,11,1+i%28), status='Submitted')

        self.stdout.write(self.style.SUCCESS('HRGenius demo data loaded successfully'))
