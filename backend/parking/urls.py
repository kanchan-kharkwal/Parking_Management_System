from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, UserViewSet, ParkingSlotViewSet,ReservationViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'users', UserViewSet)
router.register(r'parking-slots', ParkingSlotViewSet)
router.register(r'reservations', ReservationViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
