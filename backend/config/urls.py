from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from django.conf import settings
from django.conf.urls.static import static  # ✅ required for serving media

schema_view = get_schema_view(
    openapi.Info(
        title="Job Board API",
        default_version='v1',
        description="API docs for the Job Board app",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/', include('jobs.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

# ✅ Serve media files in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
