from rest_framework import routers
from ..incidents.views import IncidentsELSViewSet

app_name='incidents'

router = routers.DefaultRouter()
router.register(
    prefix=r'',
    base_name='incidents',
    viewset=IncidentsELSViewSet
)

urlpatterns = [

]