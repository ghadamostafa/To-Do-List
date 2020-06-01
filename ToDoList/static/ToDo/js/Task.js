$(document).ready(function () {

function showMessage(message)
{
	$('.container').prepend(`<div class="alert alert-success" style="margin: 10px auto;
		width: 600px;">${message}</div>`);
    		setTimeout(function() {
			    $('.alert').fadeOut('fast');
			}, 3000);
}

function deleteTask()
{
    if (confirm('are you sure you want to remove this Task?')==true)
    {
        event.preventDefault();
        console.log($(event.target).parents('a'));
        task=$(event.target).parents('a');
        task_id=task[0].id;
        console.log(task_id);
        $.ajax({
            url : "/ToDoList/deleteTask",
            type : "POST", 
            data : { "task_id":task_id,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
            success : function(json) {
                console.log("success");
                task.parents('li').remove();
                showMessage("Task Deleted Successfully");
            },
            error : function(xhr,errmsg,err) {}
             })
    }
}

// add Task
$('#addItemsForm').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  ;
    Task=$('#Item_input').val();
    console.log(Task);
    $.ajax({
        url : "/ToDoList/addTask",
        type : "POST", 
        data : { "task":Task,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
        success : function(json) {
            console.log(json);

            task_id=json.task_id;
            $('#Item_input').val("");
            $('#allList').append(`
                <li class="list-group-item">
                    <div class="form-check items">
                        <label class="form-check-label"> 
                            <input class="checkbox" class="form-check-input" type="checkbox" id="${task_id}" >  ${Task} 
                        </label> 
                         <a href="#" id="${task_id}"  class="deleteItem"><span ><i class="icon-remove" ></i></span></a> 
                    </div> 
                </li>
                `);
            showMessage("Task Added Successfully");
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {}

    });

});


// delete task
$(document).on('click','a', function(event){
	deleteTask();
	
})

$(document).on('change','input[type="checkbox"]', function(event){
      console.log(event.target.id);
      task_id=event.target.id;
      //add to completed list
      if($(this).is(":checked")){
        console.log("Checkbox is checked.");
        $.ajax({
        url : "/ToDoList/completeTask",
        type : "POST", 
        data : { "task_id":task_id,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
        success : function(json) {
        	console.log("success");
        	$('#' + task_id).closest('label').css('text-decoration', 'line-through');
        	showMessage("Task Added to completed list Successfully");
        },
        error : function(xhr,errmsg,err) {}
   		 })

      }
      //add to uncompleted list
      else if($(this).is(":not(:checked)")){
        console.log("Checkbox is unchecked.");
        $.ajax({
        url : "/ToDoList/uncompleteTask",
        type : "POST", 
        data : { "task_id":task_id,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
        success : function(json) {
        	console.log("success");
        	$('#' + task_id).closest('label').css('text-decoration', 'none');
        	showMessage("Task Added to uncompleted list Successfully");
        },
        error : function(xhr,errmsg,err) {}
   		 })
      }

});



})




