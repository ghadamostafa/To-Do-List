from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('/addTask',views.addTask,name='addTask'),
    path('/completeTask',views.completeTask,name='completeTask'),
    path('/uncompleteTask',views.uncompleteTask,name='uncompleteTask'),
    path('/deleteTask',views.deleteTask,name='deleteTask'),
    

]

