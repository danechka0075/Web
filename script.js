const nameTaskInput = document.querySelector('.taskNameInput');
const prioritySelect = document.querySelector('.prioritySelect');
const typeSelect = document.querySelector('.typeSelect');
const dateInput = document.querySelector('.dateInput');
const addTaskButton = document.querySelector('.addTaskButton');
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
    let newTask = {
        "name": nameTaskValue,
        "priority": priorityValue,
        "type": typeValue,
        "date": dateValue,
        "completed": false
    };
    tasks.push(newTask);
    // showAllTasks(); метод не реализован
    nameTaskInput.value = '';
    dateInput.value = '';

});