from django.contrib import admin
from django.urls import path, include
from app import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('list_taxpayers/', views.list_taxpayers, name='list_taxpayers'),
    path('isauthenticated/', views.authenticated, name='isauthenticated'),
    path('register/',views.register, name='register')
]


