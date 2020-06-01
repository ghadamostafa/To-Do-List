$(document).ready(function () {


$('input[type="checkbox"]').change(function(event) {
      console.log(event.target.id);
      task_id=event.target.id;
      //add completed task
      if($(this).is(":checked")){
        console.log("Checkbox is checked.");
        // console.log($('input[name=csrfmiddlewaretoken]').val());
        $.ajax({
        url : "/ToDoList/completeTask",
        type : "POST", 
        data : { "task_id":task_id,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
        success : function(json) {
        	console.log("success");
        	$('#' + task_id).closest('label').css('text-decoration', 'line-through');
        },
        error : function(xhr,errmsg,err) {}
   		 })

      }
      //
      else if($(this).is(":not(:checked)")){
        console.log("Checkbox is unchecked.");
      }

});

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
					 		<input class="checkbox" class="form-check-input" type="checkbox" id="${task_id}" >	${Task} 
					 	</label> 
					 	<span class="deleteItem"><i class="icon-remove"></i></span> 
					</div> 
				</li>
        		`);
        	$('.container').prepend(`<div class="alert alert-success" style="margin: 10px auto;
    		width: 600px;">Task Added Successfully</div>`);
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {}

    });

});

})




