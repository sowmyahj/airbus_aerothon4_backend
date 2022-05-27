from django.urls import re_path
from tutorials import views 
 
urlpatterns = [ 
    re_path(r'^api/login$', views.tutorial_list),
    re_path(r'^api/notes$',views.tutorial_notes),
    re_path(r'^api/notes/add$',views.tutorial_notes_add),
]