from django.urls import re_path
from tutorials import views 
 
urlpatterns = [ 
    re_path(r'^api/login$', views.tutorial_list),
]