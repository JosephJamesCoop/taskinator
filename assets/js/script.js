var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;

	// package up data as an object
	var taskDataObj = {
		name: taskNameInput,
		type: taskTypeInput
	};

	// send it as an argument to createTaskEl
	createTaskEl(taskDataObj);
};
var createTaskEl = function(taskDataObj) {
	//This creates a list item
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";

	// This creates a dic to hold the task list items
	var taskInfoEl = document.createElement("div");
	//This gives it a class name
	taskInfoEl.className = "task-ino";
	// This will add HTML content to the div
	taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

	//This will add it to the HTML page for display
	listItemEl.appendChild(taskInfoEl);
	
	// This will add entire list item to tasks to do box
	tasksToDoEl.appendChild(listItemEl);


};

formEl.addEventListener("submit", taskFormHandler);

