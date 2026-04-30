let tasks = [];
let nextID = 1; // counter to track the task id's

// adding tasks
function addTask() {
    const nameInput = document.getElementById("taskName");
    const priorityInput = document.getElementById("taskPriority");
    const importantInput = document.getElementById("taskImportant");
    const errorMessage = document.getElementById("errorMessage");
    
    const taskName = nameInput.value; // pull the value of nameInput (the task name)


    // validation step
    if (taskName.trim() === "") {
        errorMessage.style.display = "block"; // show error message if field is submitted blank
        nameInput.focus(); // put cursor back on input
        return; //stop the function
    }

    errorMessage.style.display = "none"; // hide error message when not in use

    // get the date the task is submitted
    const today = new Date();
    const dateAdded = today.toLocaleDateString("en-US", {
        month:  "numeric",
        day:    "numeric",
        year:   "numeric"
    });

    // create task object
    const newTask = {
        id:             nextID,
        name:           taskName.trim(),
        priority:       priorityInput.value,
        isImportant:    importantInput.checked,
        isCompleted:    false,
        date:           dateAdded
    };

    // increase ID counter
    nextID += 1;

    // push new task to the array
    tasks.push(newTask);

    // show the new task in the console log
    console.log("Task Added: " + JSON.stringify(tasks));

    // reset form fields for new tasks to be added
    nameInput.value = "";
    importantInput.checked = false;
    priorityInput.value = "Medium";

    // update the task list
    renderTasks();

    // put the cursor back in the task field for new entries
    nameInput.focus();
}

// deleting tasks
function deleteTask(id) {
    
    // new array to hold tasks we want to keep
    const updatedTasks = [];

    // loop through tasks 
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            updatedTasks.push(tasks[i]); // if task id in the list does NOT equal the one we're deleting, then keep it
        }
    // if task id does match the id we're running the function on, then it will not be stored (therefore deleting the task)
    }

    // replace the old task array with the new one
    tasks = updatedTasks;

    // log the updated array in the console
    console.log("Task Deleted (id: " + id + "): " + JSON.stringify(tasks));

    // update the task list
    renderTasks();
}

// toggling task completion
function toggleComplete(id) {

    // loop through tasks to find the corresponding task
    for (let i=0; i < tasks.length; i++) {
        if (tasks[i].id === id) {

            // flip the bool (false > true, true > false)
            tasks[i].isCompleted = !tasks[i].isCompleted; // whatever the bool is, this switches it to NOT be what it was
        }
    }

    // log the updated list to the console
    console.log("Task Updated (id: " + id + "): " + JSON.stringify(tasks));

    // update the task list
    renderTasks();
}

// display (render) the tasks
function renderTasks() {
    const container = document.getElementById("taskmanager");

    // verify if there are tasks, display message if there are none
    if (tasks.length === 0) {
        container.innerHTML = '<p id="emptyMessage">There are no tasks yet. Add one above to get started!</p>';
        return; // end function
    }

    // build the HTML string for the task list
    let html = ""; // start with an empty string

    for (let i = 0; i < tasks.length; i++) {

        // store current task
        const task = tasks[i];

        // dynamically change label of completion button based on status of the task
        let toggleLabel = task.isCompleted ? "Undo" : "Done";
        

        // build HTML for a task card and add it to the string
        html = html + 
        '<div class = "task" id="card-' + task.id + '">' + 
            '<div class="task-name" id="name-' + task.id + '">' + task.name + '</div>' +
            '<div class="task-details">' + 
                'Priority: ' + task.priority + ' &nbsp; |&nbsp; ' +
                'Date Added: ' + task.date + 
            '</div>' +
            '<button type="button" onclick="toggleComplete(' + task.id + ')">' + toggleLabel + '</button>' +
            ' ' + 
            '<button type="button" onclick="deleteTask(' + task.id + ')">Delete</button>' +
        '</div>';
        // complete and delete buttons added to the task card for convenience and aesthetic purposes
    }

    // push new HTML string
    container.innerHTML = html;

    // applying the JS style properties
    for (var j = 0; j < tasks.length; j++) {

        var t = tasks[j];

        // get the name of the task element from the DOM
        const nameTask = document.getElementById("name-" + t.id);

        // get the task card element from the DOM
        const taskCard = document.getElementById("card-" + t.id);

        // strike through completed tasks (just the name)
        if (t.isCompleted === true) {
            nameTask.style.textDecoration = "line-through";
            nameTask.style.color = "gray";
        } else {
            nameTask.style.textDecoration = "none";
            nameTask.style.color = "black";
        }

        // changing important task cards to red (only if NOT already completed)
        if (t.isImportant === true && t.isCompleted === false) {
            taskCard.style.border = "2px solid red";
            taskCard.style.backgroundColor = "#ffe0e0";
        } else {
            taskCard.style.border = "1px solid #1b5252";
            taskCard.style.backgroundColor = "#f1f1f1";
        }

        // fade out completed tasks (for aesthetics only)
        if (t.isCompleted === true) {
            taskCard.style.opacity = "0.6";
        } else {
            taskCard.style.opacity = "1";
        }
    }
}