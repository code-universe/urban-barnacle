from django.urls import path, include
from rest_framework import routers

from apis import views

# create router for backend api
apiRouter = routers.DefaultRouter()
apiRouter.register(r"test", views.TestViewSet)

# urls provided by the backend
urlpatterns = [
    path("", include(apiRouter.urls)),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
]
