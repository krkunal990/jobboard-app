from rest_framework import serializers
from .models import Job, Application

class JobSerializer(serializers.ModelSerializer):
    recruiter_username = serializers.CharField(source='recruiter.username', read_only=True)

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'description',
            'location',
            'created_at',
            'recruiter',
            'recruiter_username'
        ]
        read_only_fields = ['recruiter', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    applicant_username = serializers.CharField(source='applicant.username', read_only=True)
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'applicant',
            'applicant_username',
            'job',         # still returned in response
            'job_title',
            'resume',
            'created_at',
        ]
        read_only_fields = ['applicant', 'job', 'created_at']  # ✅ job now properly read-only
