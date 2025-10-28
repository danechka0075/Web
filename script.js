function normalDate(date) {
    if (new Date() >= new Date(date)) {
        return false;
    }
    return true;
}
function ostLiTask() {
    if (tasks.length == 0) {
        taskList.style.display = 'none';
    }
    else taskList.style.display = 'flex';
}
const nameTaskInput = document.querySelector('.taskNameInput');
const prioritySelect = document.querySelector('.prioritySelect');
const typeSelect = document.querySelector('.typeSelect');
const dateInput = document.querySelector('.dateInput');
const addTaskButton = document.querySelector('.addTaskButton');
const taskListContainer = document.querySelector('.tasksListContent');
const taskList = document.querySelector('.taskList');
let tasks = [];

addTaskButton.addEventListener('click', () => {
    let nameTaskValue = nameTaskInput.value.trim();
    let priorityValue = prioritySelect.value;
    let typeValue = typeSelect.value;
    let dateValue = dateInput.value;
    
    if (nameTaskValue === '' || dateValue === '') {
        alert('Please fill in all fields.');
        return;
    }
    if (!normalDate(dateValue)) {
        alert('Please select a valid future date.');
        return;
    }
    let newTask = {
        "name": nameTaskValue,
        "priority": priorityValue,
        "type": typeValue,
        "date": dateValue,
        "completed": false
    };
    tasks.push(newTask);
    showAllTasks();
    ostLiTask();
    nameTaskInput.value = '';
    dateInput.value = '';
    console.log("Task added:", newTask);
});
const showTask = (task, index) => {
    if (task.completed) {
        return `
    <div class="taskItemV" style="background-color: ${task.completed ? '#aaf87cff' : '#f87c7cff'};">
        <div class="taskItem">
            <h3 style="text-decoration: line-through; text-decoration-thickness: 3px;">${index + 1}. ${task.name}</h3>
            <p>Status: ${task.completed ? 'Complete' : 'Not complete'}</p>
        </div>
        <div class="buttonTaskList">
            <button class="taskButton" onclick="delTask(${index})">Delete</button>            
        </div>
    </div>`;
    }
    else return `
    <div class="taskItemV" style="background-color: ${task.completed ? '#aaf87cff' : '#f87c7cff'};">
        <div class="taskItem">
            <h3>${index + 1}. ${task.name}</h3>
            <p>Priority: ${task.priority}</p>
            <p>Type: ${task.type}</p>
            <p>Date: ${task.date}</p>
            <p>Status: ${task.completed ? 'Complete' : 'Not complete'}</p>
        </div>
        <div class="buttonEditTaskDiv">
            <button class="buttonEditTask" onclick="editTask(${index})">Edit</button>
        </div>
        <div class="buttonTaskList">
            <button class="taskButton" onclick="delTask(${index})">Delete</button>            
            <button class="taskButton" onclick="completedTask(${index})">Complete</button>
        </div>
        <div class="boxUpdate">

        <div/>
    </div>
    `;
};
const showAllTasks = () => {
    let taskListHTML = '';
    tasks.map((task, index) => {
        taskListHTML += showTask(task, index);
    });
    taskListContainer.innerHTML = taskListHTML;
};
const delTask = (index) => {
    tasks.splice(index, 1);
    showAllTasks();
    ostLiTask();
};
const completedTask = (index) => {
    tasks[index].completed = true;
    showAllTasks();
};
const editTask = (index) => {
    const boxUpdate = document.getElementsByClassName('boxUpdate')[index];
    boxUpdate.innerHTML = `
    <div class="editTaskContainer">
        <input type="text" class="editNameInput" placeholder="New task name" value="${tasks[index].name}"/>
        <input type="date" class="editDateInput" value="${tasks[index].date}"/>
        <div class="buttonsEditTask">
            <button class="cancelEditButton" onclick="cancelEditTask(${index})">Cancel</button>
            <button class="saveEditButton" onclick="saveButtonClick(${index})">Save</button>
        </div>
    </div>
    `;
    saveButtonClick = (index) =>{
        const newName = document.querySelector('.editNameInput').value;
        const newDate = document.querySelector('.editDateInput').value;
        console.log(newName, newDate);
        if(normalDate(newDate) && newName !== '') {
            setValues(index, newName, newDate);
        }
        else {
            alert('Please enter a valid name and future date.');
        }
    };

};
const cancelEditTask = (index) => {
    document.getElementsByClassName('boxUpdate')[index].innerHTML = '';
    showAllTasks();
};
const setValues = (index, newName, newDate) => {
    tasks[index].name = newName;
    tasks[index].date = newDate;
    document.getElementsByClassName('boxUpdate')[index].innerHTML = '';
    showAllTasks();
}
