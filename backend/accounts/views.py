from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)
