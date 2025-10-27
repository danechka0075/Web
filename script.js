function normalDate(date) {
    if (new Date() >= new Date(date)) {
        return false;
    }
    return true;
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
    taskList.style.display = 'flex';

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
    nameTaskInput.value = '';
    dateInput.value = '';
    console.log("Task added:", newTask);
});
const showTask = (task, index) => {
    return `
    <div class="taskItem" style="background-color: ${task.completed ? '#aaf87cff' : '#f87c7cff'}">
        <h3>${index + 1}. ${task.name}</h3>
        <p>Priority: ${task.priority}</p>
        <p>Type: ${task.type}</p>
        <p>Date: ${task.date}</p>
        <p>Status: ${task.completed ? 'Complete' : 'Not complete'}</p>
        <div class="buttonTaskList">
            <button class="taskButton" onclick="delTask(${index})">Delete</button>
            <button class="taskButton" onclick="completeTask(${index})">Complete</button>
        </div>
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