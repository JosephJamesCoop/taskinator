var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

var taskFormHandler = function (event) {
	event.preventDefault();
	var taskNameInput = document.querySelector("input[name='task-name']").value;
	var taskTypeInput = document.querySelector("select[name='task-type']").value;
	// Check if input values are empty strings
	if (!taskNameInput || !taskTypeInput) {
		alert("You need to fill out the task form!");
		return false;
	}
	// reset form fields for next task to be entered
	document.querySelector("input[name='task-name']").value = "";
	document.querySelector("select[name='task-type']").selectedIndex = 0;
	var isEdit = formEl.hasAttribute("data-task-id");
	// has data attribute, so get task id and call function to complete edit process
	if (isEdit) {
		var taskId = formEl.getAttribute("data-task-id");
		completeEditTask(taskNameInput, taskTypeInput, taskId);
	}
	// no data attribute, so create object as normal and pass to createTaskEl function
	else {
		// package up data as an object
		var taskDataObj = {
			name: taskNameInput,
			type: taskTypeInput,
			status: "to do"
		};

		// send it as an argument to createTaskEl
		createTaskEl(taskDataObj);
	}
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
	taskDataObj.id = taskIdCounter;
	tasks.push(taskDataObj);
	saveTasks();
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
var completeEditTask = function (taskName, taskType, taskId) {
	// find the matching tsk list item
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

	// set new values
	taskSelected.querySelector("h3.task-name").textContent = taskName;
	taskSelected.querySelector("span.task-type").textContent = taskType;
	alert("Task Updated");
	// loop through tasks array and task object with new content
	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].id === parseInt(taskId)) {
			tasks[i].name = taskName;
			tasks[i].type = taskType;
		}
		
	}
	formEl.removeAttribute("data-task-id");
	document.querySelector("#save-task").textContent = "Add Task";
	saveTasks();
};


var taskButtonHandler = function (event) {
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

var taskStatusChangeHandler = function (event) {
	//get the task item's id
	var taskId = event.target.getAttribute("data-task-id");

	// get the currently selected oiption's value and convert to lowercase
	var statusValue = event.target.value.toLowerCase();

	// find the parent task item element based on the id
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	if (statusValue === "to do") {
		tasksToDoEl.appendChild(taskSelected);
	}
	else if (statusValue === "in progress") {
		tasksInProgressEl.appendChild(taskSelected);
	}
	else if (statusValue === "completed") {
		tasksCompletedEl.appendChild(taskSelected);
	}
	// update task's in tasks array
	for (var i = 0; i < tasks.length; i++)
		if (tasks[i].id === parseInt(taskId)) {
			tasks[i].status = statusValue;
		}

	
	saveTasks();
};
var editTask = function (taskId) {
	// get task list item element
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	// get content from task name an type
	var taskName = taskSelected.querySelector("h3.task-name").textContent;
	var taskType = taskSelected.querySelector("span.task-type").textContent;
	document.querySelector("input[name='task-name']").value = taskName;
	document.querySelector("select[name='task-type']").value = taskType;
	formEl.setAttribute("data-task-id", taskId);
	document.querySelector("#save-task").textContent = "Save Task";

}
var deleteTask = function (taskId) {
	var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
	taskSelected.remove();

	//create new arrat to hold updated list of tasks
	var updatedTaskArr = [];
	// loop through current tasks
	console.log(tasks.length)
	for (var i = 0; i < tasks.length; i++) {
		//if(tasks[i].id doesn't match the value of taskId, let's keep that tasks and push it into a new array
		if(tasks[i].id !== parseInt(taskId)) {
			
			updatedTaskArr.push(tasks[i]);
		}
		
	}
	//reassign tasks array to be the same as updatedTaskArr
	console.log(updatedTaskArr)
	tasks = updatedTaskArr;
	console.log(tasks);
	console.log(tasks.length)
	saveTasks();
};
var saveTasks = function() {
	console.log(tasks)
	localStorage.setItem("tasks", JSON.stringify(tasks));
};
var loadTasks = function() {
	var tasks = localStorage.getItem("tasks");
	JSON.stringify(tasks)
	console.log(tasks);
	
		tasks = JSON.parse(tasks);
		console.log(tasks);
	
	for (var i = 0; i < tasks.length; i++) {
	tasks[i].id = taskIdCounter
	console.log(tasks)


	var listItemEl = document.createElement("li");
	listItemEl.className = "task-item";
	listItemEl.setAttribute("data-task-id", tasks[i].id);
	console.log(listItemEl);

	var taskInfoEl = document.createElement("div");
		taskInfoEl.className = "task-info";
		taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + tasks[i].name + "</h3> <span class = 'task-type'>" + tasks[i].type + "</span>";
		listItemEl.appendChild(taskInfoEl);
	var taskActionsEl = createTaskActions(tasks[i].id);
	listItemEl.appendChild(taskActionsEl);
	console.log(listItemEl);

	if(tasks[i].status === "to do") {
		listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
	tasksToDoEl.appendChild(listItemEl);
	}
	else if (tasks[i].status === "in progress") {
		listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
		tasksInProgressEl.appendChild(listItemEl);
	}
	else if (tasks[i].status === "complete") {
		listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
		listItemEl.appendChild(tasksCompletedEl);
	}
	taskIdCounter++;
	console.log(listItemEl);
	}
};


formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

loadTasks();
