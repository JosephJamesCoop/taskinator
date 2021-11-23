var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;


var taskFormHandler = function (event) {
	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;
	// Check if input values are empty strings
	if (!taskNameInput || !taskTypeInput) {
		alert("You need to fill out the task form!");
		return false;
	}
	// package up data as an object
	var taskDataObj = {
		name: taskNameInput,
		type: taskTypeInput
	};

	// send it as an argument to createTaskEl
	createTaskEl(taskDataObj);
	formEl.reset();
};
var createTaskEl = function (taskDataObj) {
	//This creates a list item
	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";
	// add task ID as a custom attribute.
	listItemEl.setAttribute("data-task-id", taskIdCounter);
	// This creates a dic to hold the task list items
	var taskInfoEl = document.createElement("div");
	//This gives it a class name
	taskInfoEl.className = "task-info";
	// This will add HTML content to the div
	taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

	//This will add it to the HTML page for display
	listItemEl.appendChild(taskInfoEl);

	var taskActionsEl = createTaskActions(taskIdCounter);
	listItemEl.appendChild(taskActionsEl);
	// This will add entire list item to tasks to do box
	tasksToDoEl.appendChild(listItemEl);

	taskIdCounter++;
};

var createTaskActions = function (taskId) {
	var actionContainerEl = document.createElement("div");
	actionContainerEl.className = "task-actions";
	//create edit button
	var editButtonEl = document.createElement("button");
	editButtonEl.textContent = "Edit";
	editButtonEl.className = "btn edit-btn";
	editButtonEl.setAttribute("data-task-id", taskId);

	actionContainerEl.appendChild(editButtonEl);

	// Create delete button
	var deleteButtonEl = document.createElement("button");
	deleteButtonEl.textContent = "delete";
	deleteButtonEl.className = "btn delete-btn";
	deleteButtonEl.setAttribute("data-task-id", taskId);

	actionContainerEl.appendChild(deleteButtonEl);

	var statusSelectEl = document.createElement("select");
	statusSelectEl.className = "select-status";
	statusSelectEl.setAttribute("name", "status-change");
	statusSelectEl.setAttribute("data-task-id", taskId);
	actionContainerEl.appendChild(statusSelectEl);

	var statusChoices = ["To Do", "In Progress", "Completed"];
	for (var i = 0; i < statusChoices.length; i++) {
		// create option element
		var statusOptionEl = document.createElement("option");
		statusOptionEl.textContent = statusChoices[i];
		statusOptionEl.setAttribute("value", statusChoices[i]);

		// append to select
		statusSelectEl.appendChild(statusOptionEl);
	}


	return actionContainerEl;


};

formEl.addEventListener("submit", taskFormHandler);


var taskButtonHandler = function(event) {
	// get target element from event
	var targetEl = event.target;

	// edit button was clicked
	if (targetEl.matches(".edit-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		editTask(taskId);
	}


	// delete button was clicked
	else if (targetEl.matches(".delete-btn")) {
		var taskId = targetEl.getAttribute("data-task-id");
		deleteTask(taskId);
	}
};
var editTask = function(taskId) {
	// get task list item element
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	// get content from task name an type
	var taskName = taskSelected.querySelector("h3.task-name").textContent;
	console.log(taskName);
	var taskType = taskSelected.querySelector("span.task-type").textContent;
	document.querySelector("input[name='task-name']").value = taskName;
	document.querySelector("select[name='task-type']").value = taskType;
	document.querySelector("#save-task").textContent = "Save Task";
	formEl.setAttribute("data-task-id", taskId);
}
var deleteTask = function(taskId) {
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);