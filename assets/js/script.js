var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {

	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;

	// This creates a list item
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";
	
	// This creates a div to hold the task items
	var taskInfoEl = document.createElement("div");
	
	//gives it a class name
	taskInfoEl.className = "task-info";

	// This will add HTML content to the div
	taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
	listItemEl.appendChild(taskInfoEl);

	// add entire list itme to task to do box
	tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);

