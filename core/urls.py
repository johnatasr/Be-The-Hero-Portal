from django.urls import path
from core.api.viewsets import current_user, UserList
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithEmailView, CustomUserCreate, LogoutAndBlacklistRefreshTokenForUserView
app_name = 'core'

urlpatterns = [
    # path('current_user/', current_user),
    # path('users/', UserList.as_view())
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithEmailView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
]