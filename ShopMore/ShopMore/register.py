from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .backend.models.user import User as UserList

def registerfunction(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        auth_user_id = user.id

        userlist = UserList.objects.create(
            user_id = auth_user_id,
            username = username,
            password = password,
            email = email,
        )

        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)