from django.urls import path
from .views import SignupView, current_user

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("me/", current_user, name="current-user"),
]
