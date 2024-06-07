from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, UserViewSet, ParkingSlotViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'users', UserViewSet)
router.register(r'parking-slots', ParkingSlotViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
