from rest_framework import serializers 
from tutorials.models import User
 
 
class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('user_name','password')


class UserOneSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('id','user_name','password')