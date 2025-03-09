//Keeps track of the current filter tab, default "All"
let currentFilter = "All"; 

//Function for new task creation  
function addTask(){
	let titleField = document.getElementById("taskTitle");
	let descriptionField = document.getElementById("taskDescription");
	let taskList = document.getElementById("taskList");

	let title = titleField.value;
	let description = descriptionField.value;
	
	//Makes sure both title and description is filled 
	if (title === "" || description === "") return;

	//Creates new list item and adds to it a "complete" status checkbox, title, description and delete button 
	let newListItem = document.createElement("li");
	newListItem.innerHTML = `
	<input class="form-check-input" type="checkbox" onchange="changeStatus(this)"> 
		<strong>${title}</strong> <br>
		<p class="text-muted">${description}</p>
	</input>
	<br>
	<button type="button" class="btn btn-danger" onclick=deleteTask(this)> DELETE </button> 
	<hr>
	`;
	//Ensures the new task's status is "Active"
	newListItem.setAttribute("data-status", "Active");
	
	//Adds the new task to the task list and clears form text 
	taskList.appendChild(newListItem);
	titleField.value = "";
	descriptionField.value = "";
}

//Function that removes/adds crossed out effect and changes the task's completion status when checkbox changes state
function changeStatus(taskCheck){
	//finds the task's text
	let task = taskCheck.nextElementSibling;
	
	if(taskCheck.checked){
		task.classList.add("completed");
		task.parentElement.setAttribute("data-status", "Completed");
	}
	else{
		task.classList.remove("completed");
		task.parentElement.setAttribute("data-status", "Active");
	}
	
	//Updates current filter view 
	filterTasks(currentFilter);
}

//Function that finds and deletes selected task
function deleteTask(deleteButton){
	deleteButton.parentElement.remove();
}

//Function that filters tasks based on selected tab
function filterTasks(filterStatus){
	let tasks = document.querySelectorAll("#taskList li");
	
	//Removes the currently selected effect from tabs and adds it to the newly selected one
	document.querySelectorAll(".nav-link").forEach(tab => tab.classList.remove("active"));
	currentFilter= filterStatus;
	document.querySelector(`.nav-link[data-filter="${filterStatus}"]`).classList.add('active');
	
	//Checks each task and shows/hides it depending if it fits the filter
	tasks.forEach(task => {
		let taskStatus = task.getAttribute("data-status");
		switch(filterStatus){
			case "All": task.style.display = "block"; break;
			case "Active": if(taskStatus === "Active")task.style.display = "block";
						   else task.style.display = "none";
						   break;
			case "Completed": if(taskStatus === "Completed") task.style.display = "block"; 
							  else task.style.display = "none";
							  break;
			default: task.style.display = "none"; break;
		}
	});
}