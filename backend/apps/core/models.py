from django.db import models

# Create your models here.
from django.conf import settings
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class Department(TimestampedModel):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)
    def __str__(self): return self.name


class Designation(TimestampedModel):
    title = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name='designations')
    class Meta: unique_together = ('title', 'department')


class Employee(TimestampedModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    employee_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    gender = models.CharField(max_length=20, choices=[('Male','Male'),('Female','Female'),('Other','Other')])
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_joining = models.DateField()
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    designation = models.ForeignKey(Designation, on_delete=models.PROTECT)
    city = models.CharField(max_length=100)
    address = models.TextField(blank=True)
    basic_salary = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=[('Active','Active'),('Inactive','Inactive')], default='Active')
    def __str__(self): return f'{self.employee_id} - {self.first_name} {self.last_name}'


class JobOpening(TimestampedModel):
    title = models.CharField(max_length=150)
    department = models.ForeignKey(Department, on_delete=models.PROTECT)
    location = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=30, default='Full-time')
    positions = models.PositiveIntegerField(default=1)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Open')


class Candidate(TimestampedModel):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    city = models.CharField(max_length=100)
    resume = models.FileField(upload_to='resumes/', blank=True)


class Application(TimestampedModel):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    job = models.ForeignKey(JobOpening, on_delete=models.CASCADE)
    status = models.CharField(max_length=30, default='Applied')
    interview_date = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)


class Payroll(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    month = models.DateField()
    basic = models.DecimalField(max_digits=12, decimal_places=2)
    hra = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    allowances = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    net_salary = models.DecimalField(max_digits=12, decimal_places=2)
    class Meta: unique_together = ('employee', 'month')


class Attendance(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default='Present')
    class Meta: unique_together = ('employee', 'date')


class Leave(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=30)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, default='Pending')


class Goal(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    target_date = models.DateField()
    status = models.CharField(max_length=20, default='In Progress')


class PerformanceReview(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    period = models.CharField(max_length=30)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    feedback = models.TextField(blank=True)


class Training(TimestampedModel):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    duration_hours = models.PositiveIntegerField(default=1)
    description = models.TextField(blank=True)


class TrainingEnrollment(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    training = models.ForeignKey(Training, on_delete=models.CASCADE)
    progress = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default='Assigned')
    completed_at = models.DateField(null=True, blank=True)


class Benefit(TimestampedModel):
    name = models.CharField(max_length=150)
    benefit_type = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    provider = models.CharField(max_length=150, blank=True)


class BenefitEnrollment(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE)
    start_date = models.DateField()
    status = models.CharField(max_length=20, default='Active')


class ComplianceDocument(TimestampedModel):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    document_type = models.CharField(max_length=100)
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='Submitted')
    file = models.FileField(upload_to='documents/', blank=True)


class AuditLog(TimestampedModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=200)
    details = models.TextField(blank=True)
