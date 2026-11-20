from rest_framework import serializers
from .models import *


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    designation_name = serializers.CharField(source='designation.title', read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'


class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = '__all__'


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'


class ApplicationSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)
    class Meta:
        model = Application
        fields = '__all__'


class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    def get_employee_name(self, obj):
        return f'{obj.employee.first_name} {obj.employee.last_name}'
    class Meta:
        model = Payroll
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    def get_employee_name(self, obj):
        return f'{obj.employee.first_name} {obj.employee.last_name}'
    class Meta:
        model = Attendance
        fields = '__all__'


class LeaveSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    def get_employee_name(self, obj):
        return f'{obj.employee.first_name} {obj.employee.last_name}'
    class Meta:
        model = Leave
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'


class PerformanceReviewSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()
    employee_name = serializers.SerializerMethodField()

    def get_reviewer_name(self, obj):
        return obj.reviewer.get_full_name() or obj.reviewer.username

    def get_employee_name(self, obj):
        return f'{obj.employee.first_name} {obj.employee.last_name}'

    class Meta:
        model = PerformanceReview
        fields = '__all__'
        read_only_fields = ('reviewer',)


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = '__all__'


class TrainingEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingEnrollment
        fields = '__all__'


class BenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefit
        fields = '__all__'


class BenefitEnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitEnrollment
        fields = '__all__'


class ComplianceDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceDocument
        fields = '__all__'
