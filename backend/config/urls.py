"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.views.generic.base import RedirectView
from django.conf import settings
from apps.accounts.views import LoginView, ProfileView
from apps.core.views import *

urlpatterns = [
    path('', RedirectView.as_view(
        url=getattr(settings, 'FRONTEND_URL', 'http://localhost:5173/'),
        permanent=False,
    )),
    path('admin/', admin.site.urls),
    path('api/auth/login/', LoginView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),
    path('api/auth/profile/', ProfileView.as_view()),
]

router = DefaultRouter()
router.register('departments', DepartmentViewSet, basename='department')
router.register('designations', DesignationViewSet, basename='designation')
router.register('employees', EmployeeViewSet, basename='employee')
router.register('jobs', JobOpeningViewSet, basename='job')
router.register('candidates', CandidateViewSet, basename='candidate')
router.register('applications', ApplicationViewSet, basename='application')
router.register('payroll', PayrollViewSet, basename='payroll')
router.register('attendance', AttendanceViewSet, basename='attendance')
router.register('leaves', LeaveViewSet, basename='leave')
router.register('goals', GoalViewSet, basename='goal')
router.register('reviews', PerformanceReviewViewSet, basename='review')
router.register('training', TrainingViewSet, basename='training')
router.register('enrollments', TrainingEnrollmentViewSet, basename='enrollment')
router.register('benefits', BenefitViewSet, basename='benefit')
router.register('benefit-enrollments', BenefitEnrollmentViewSet, basename='benefit-enrollment')
router.register('documents', ComplianceDocumentViewSet, basename='document')
router.register('analytics', AnalyticsView, basename='analytics')

urlpatterns += [path('api/', include(router.urls))]
