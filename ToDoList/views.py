from django.shortcuts import render,redirect
from django.views.decorators.http import require_POST
from django.http import HttpResponse, JsonResponse
from .forms import ToDoForm
from .models import TodoList

def index(request):
	form= ToDoForm()
	context={'ToDoForm':form}
	return render(request, "ToDo/index.html",context) 

@require_POST
def addTask(request):
	print(request.POST['task'])
	if request.method == 'POST':
		Item=TodoList(Task=request.POST['task'])
		Item.save()
	# formData=ToDoForm(request.POST)
	# if(formData.is_valid()):
	# 	Item=TodoList(Task=request.POST['Task'])
	# 	Item.save()
	# print (request.POST['Task'])
	# return redirect('ToDoList:index')
	return JsonResponse({'recieved':'recieved'})