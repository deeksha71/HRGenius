from django.shortcuts import render

# Create your views here.
from django.db.models import Count, Sum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, BasePermission
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Department, Designation, Employee, JobOpening, Candidate, Application, Payroll, Attendance, Leave, Goal, PerformanceReview, Training, TrainingEnrollment, Benefit, BenefitEnrollment, ComplianceDocument
from .serializers import *


class AdminOrHrOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.role in ('ADMIN', 'HR')


class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [AdminOrHrOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter]


class DepartmentViewSet(BaseViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class DesignationViewSet(BaseViewSet):
    queryset = Designation.objects.select_related('department').all()
    serializer_class = DesignationSerializer


class EmployeeViewSet(BaseViewSet):
    queryset = Employee.objects.select_related('department','designation').all()
    serializer_class = EmployeeSerializer
    search_fields = ['employee_id','first_name','last_name','email','city']
    filterset_fields = ['department','status','designation']

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(user=self.request.user)
        return queryset


class JobOpeningViewSet(BaseViewSet):
    queryset = JobOpening.objects.all()
    serializer_class = JobOpeningSerializer


class CandidateViewSet(BaseViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class ApplicationViewSet(BaseViewSet):
    queryset = Application.objects.select_related('candidate','job').all()
    serializer_class = ApplicationSerializer


class PayrollViewSet(BaseViewSet):
    queryset = Payroll.objects.select_related('employee').all()
    serializer_class = PayrollSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        obj = serializer.save()
        obj.net_salary = obj.basic + obj.hra + obj.allowances - obj.deductions
        obj.save(update_fields=['net_salary'])


class AttendanceViewSet(BaseViewSet):
    queryset = Attendance.objects.select_related('employee').all()
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset


class LeaveViewSet(BaseViewSet):
    queryset = Leave.objects.select_related('employee').all()
    serializer_class = LeaveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        if self.request.user.role == 'EMPLOYEE':
            employee = Employee.objects.filter(user=self.request.user).first()
            if not employee:
                from rest_framework.exceptions import ValidationError
                raise ValidationError({'employee': 'No employee profile is linked to this account.'})
            serializer.save(employee=employee, status='Pending')
        else:
            serializer.save()


class GoalViewSet(BaseViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer


class PerformanceReviewViewSet(BaseViewSet):
    queryset = PerformanceReview.objects.all()
    serializer_class = PerformanceReviewSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)


class TrainingViewSet(BaseViewSet):
    queryset = Training.objects.all()
    serializer_class = TrainingSerializer


class TrainingEnrollmentViewSet(BaseViewSet):
    queryset = TrainingEnrollment.objects.all()
    serializer_class = TrainingEnrollmentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset


class BenefitViewSet(BaseViewSet):
    queryset = Benefit.objects.all()
    serializer_class = BenefitSerializer


class BenefitEnrollmentViewSet(BaseViewSet):
    queryset = BenefitEnrollment.objects.all()
    serializer_class = BenefitEnrollmentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset


class ComplianceDocumentViewSet(BaseViewSet):
    queryset = ComplianceDocument.objects.all()
    serializer_class = ComplianceDocumentSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.role == 'EMPLOYEE':
            return queryset.filter(employee__user=self.request.user)
        return queryset


class AnalyticsView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def summary(self, request):
        return Response({
            'totalEmployees': Employee.objects.count(),
            'activeEmployees': Employee.objects.filter(status='Active').count(),
            'openPositions': JobOpening.objects.filter(status='Open').count(),
            'pendingLeaves': Leave.objects.filter(status='Pending').count(),
            'departments': list(Department.objects.annotate(value=Count('employee')).values('name','value')),
            'gender': list(Employee.objects.values('gender').annotate(value=Count('id'))),
            'payroll': list(Payroll.objects.values('month').annotate(value=Sum('net_salary')).order_by('month')[:12]),
            'applications': list(Application.objects.values('status').annotate(value=Count('id'))),
        })
