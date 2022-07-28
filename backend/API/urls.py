from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegisteration.as_view(), name='register'),
    path('tasks/', views.TaskView.as_view(), name='tasks')
]
