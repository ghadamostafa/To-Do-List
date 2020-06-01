from django.shortcuts import render,redirect
from django.views.decorators.http import require_POST
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from .forms import ToDoForm
from .models import TodoList

def index(request):
	form= ToDoForm()
	AllList=TodoList.objects.all()
	context={'ToDoForm':form,'List':AllList}
	return render(request, "ToDo/index.html",context) 

@require_POST
def addTask(request):
	print(request.POST['task'])
	if request.method == 'POST':
		Task=TodoList(Task=request.POST['task'])
		Task.save()
		# messages.success(request, 'Task Added Successfully')
		return JsonResponse({'task_id':Task.id})
	else:
		return JsonResponse({'fail':"Not Available"})
	# formData=ToDoForm(request.POST)
	# if(formData.is_valid()):
	# 	Item=TodoList(Task=request.POST['Task'])
	# 	Item.save()
	# print (request.POST['Task'])
	# return redirect('ToDoList:index')

@require_POST	
def completeTask(request):
	print(request.POST['task_id'])
	task_id=request.POST['task_id']
	Task=TodoList.objects.filter(id=task_id).update(Completed=True)
	return JsonResponse({'recieved':'recieved'})


@require_POST	
def uncompleteTask(request):
	print(request.POST['task_id'])
	task_id=request.POST['task_id']
	Task=TodoList.objects.filter(id=task_id).update(Completed=False)
	return JsonResponse({'recieved':'recieved'})

def deleteTask(request):
	print(request.POST['task_id'])
	task_id=request.POST.get('task_id')
	Task=TodoList.objects.filter(id=task_id).delete()
	return JsonResponse({'recieved':'recieved'})