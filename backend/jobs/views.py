from rest_framework import viewsets, permissions, parsers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job, Application
from .serializers import JobSerializer, ApplicationSerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)

    # ✅ POST /api/v1/jobs/<id>/apply/
    @action(
        detail=True,
        methods=['post'],
        url_path='apply',
        permission_classes=[permissions.IsAuthenticated],
        parser_classes=[parsers.MultiPartParser, parsers.FormParser]
    )
    def apply_to_job(self, request, pk=None):
        job = self.get_object()
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(applicant=request.user, job=job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('-created_at')
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)
