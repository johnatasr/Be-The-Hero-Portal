from django.conf.urls import url
from django.urls import path, include
from frontend.views import index
app_name='frontend'

urlpatterns = [
    path('', index),  # for the empty url
    url(r'^.*/$', index)  # for all other urls
]