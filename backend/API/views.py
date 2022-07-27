from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, TaskSerialiazer, MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Task

from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
class UserRegisteration(APIView):

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        tasks = Task.objects.all()
        serialized_data = TaskSerialiazer(tasks, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

        