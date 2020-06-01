$(document).ready(function () {

$('#addItemsForm').on('submit', function(event){
    event.preventDefault();
    console.log("form submitted!")  ;
    Task=$('#Item').val();
    console.log(Task);
    $.ajax({
        url : "/ToDoList/addTask",
        type : "POST", 
        data : { "task":Task,"csrfmiddlewaretoken":$('input[name=csrfmiddlewaretoken]').val()}, 
        success : function(json) {
        	console.log(json);
        	$('#allList').append(`
        		<li class="list-group-item">
					<div class="form-check items">
					 	<label class="form-check-label"> 
					 		<input class="checkbox" class="form-check-input" type="checkbox">	${Task} 
					 		<span class="deleteItem"><i class="icon-remove"></i></span> 
					 	</label> 
					</div> 
				</li>
        		`);
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {}

    });

});

})




