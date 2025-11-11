function normalDate(date) {
    if (new Date() >= new Date(date)) {
        return false;
    }
    return true;
}

function ostLiTask() {
    if (tasks.length == 0) {
        taskList.style.display = 'none';
        document.querySelector('.FilterTask').style.display = 'none';
    }
    else{
        taskList.style.display = 'flex';
        document.querySelector('.FilterTask').style.display = 'flex';
    }   
}

const nameTaskInput = document.querySelector('.taskNameInput');
const prioritySelect = document.querySelector('.prioritySelect');
const typeSelect = document.querySelector('.typeSelect');
const dateInput = document.querySelector('.dateInput');
const addTaskButton = document.querySelector('.addTaskButton');
const taskListContainer = document.querySelector('.tasksListContent');
const taskList = document.querySelector('.taskList');
const filterTaskPrioritySelect = document.querySelector('.filterPrioritySelect');
const filterTaskTypeSelect = document.querySelector('.filterTypeSelect');
const filterButtonApply = document.querySelector('.filterApplyButton');
const filterButtonClear = document.querySelector('.filterClearButton');
const checkboxSort = document.querySelector('.sortImportanceCheckbox')
const buttonUP = document.querySelector('.Up');
let flag_filter = false;
let tasks = [];

buttonUP.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });   
});

if (checkboxSort) {
    checkboxSort.addEventListener('change', () => {
        sortedTask(tasks);
    });
}

const sortedTask = (tasks) => {
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    if (checkboxSort.checked) {
        let toDisplay;
        if (flag_filter) {
            const selPr = filterTaskPrioritySelect ? filterTaskPrioritySelect.value : 'All';
            const selType = filterTaskTypeSelect ? filterTaskTypeSelect.value : 'All';
            toDisplay = tasks.filter(task => (selPr === 'All' || task.priority === selPr) && (selType === 'All' || task.type === selType));
        } else {
            toDisplay = [...tasks];
        }
        toDisplay.sort((a, b) => (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1));
        showFilteredTasks(toDisplay);
    } else {
        flag_filter ? filterButtonApply.click() : showAllTasks();
    }
};


filterButtonApply.addEventListener('click', () => {
    const selectedPriority = filterTaskPrioritySelect.value;
    const selectedType = filterTaskTypeSelect.value;
    flag_filter = true;
    const filteredTasks = tasks.filter(task => {
            return (selectedPriority === 'All' || task.priority === selectedPriority) &&
                   (selectedType === 'All' || task.type === selectedType);
    });
    if (checkboxSort && checkboxSort.checked) {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        const sorted = [...filteredTasks].sort((a, b) => 
            (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
        );
        showFilteredTasks(sorted);
    } else {
        showFilteredTasks(filteredTasks);
    }
});

filterButtonClear.addEventListener('click', () => {
    filterTaskPrioritySelect.value = 'All';
    filterTaskTypeSelect.value = 'All';
    flag_filter = false;
    if (checkboxSort && checkboxSort.checked) {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        const sorted = [...tasks].sort((a, b) => 
            (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
        );
        showFilteredTasks(sorted);
    } else {
        showAllTasks();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 'NumpadEnter' || event.key === 'Return' ) {
        addTaskButton.click();
    }
});

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
        id: Date.now().toString(),
        "name": nameTaskValue,
        "priority": priorityValue,
        "type": typeValue,
        "date": dateValue,
        "completed": false
    };
    tasks.push(newTask);
    flag_filter?filterButtonApply.click():showAllTasks();
    ostLiTask();
    nameTaskInput.value = '';
    dateInput.value = '';
    console.log("Task added:", newTask);
});

const showTask = (task, displayIndex) => {
    if (task.completed) {
        return `
        <div class="taskItemV" data-id="${task.id}" draggable="true" style="background-color: ${task.completed ? '#aaf87cff' : '#f87c7cff'};">
            <div class="taskItemContainer">
                <div class="taskItem">
                    <h3 style="text-decoration: line-through; text-decoration-thickness: 3px;">${displayIndex + 1}. ${task.name}</h3>
                    <p>Status: ${task.completed ? 'Complete' : 'Not complete'}</p>
                </div>
                <div class="buttonTaskList">
                    <button class="taskButton" onclick="delTask('${task.id}')">Delete</button>            
                </div>
            </div>
            <div class="boxUpdate"></div>
        </div>`;
    }
    else return `
    <div class="taskItemV" data-id="${task.id}" draggable="true" style="background-color: ${task.completed ? '#aaf87cff' : '#f87c7cff'};">
        <div class="taskItemContainer">
            <div class="taskItem">
                <h3>${displayIndex + 1}. ${task.name}</h3>
                <p>Priority: ${task.priority}</p>
                <p>Type: ${task.type}</p>
                <p>Date: ${task.date}</p>
                <p>Status: ${task.completed ? 'Complete' : 'Not complete'}</p>
            </div>
            <div class="taskButtonsRight">
                <button class="buttonEditTask" onclick="editTask('${task.id}')">Edit</button>
                <button class="taskButton" onclick="delTask('${task.id}')">Delete</button>            
                <button class="taskButton" onclick="completedTask('${task.id}')">Complete</button>
            </div>
        </div>
        <div class="boxUpdate"></div>
    </div>
    `;
};

const showAllTasks = () => {
    let taskListHTML = '';
    tasks.forEach((task, index) => {
        taskListHTML += showTask(task, index);
    });
    taskListContainer.innerHTML = taskListHTML;
};

const showFilteredTasks = (Tasks) => {
    let taskListHTML = '';
    Tasks.forEach((task, displayIndex) => {
        taskListHTML += showTask(task, displayIndex);
    });
    taskListContainer.innerHTML = taskListHTML;
};

const delTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;
    tasks.splice(index, 1);
    
    if (flag_filter) {
        const selectedPriority = filterTaskPrioritySelect.value;
        const selectedType = filterTaskTypeSelect.value;
        const filteredTasks = tasks.filter(task => {
            return (selectedPriority === 'All' || task.priority === selectedPriority) &&
                   (selectedType === 'All' || task.type === selectedType);
        });
        if (checkboxSort && checkboxSort.checked) {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            const sorted = [...filteredTasks].sort((a, b) => 
                (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
            );
            showFilteredTasks(sorted);
        } else {
            showFilteredTasks(filteredTasks);
        }
    } else {
        if (checkboxSort && checkboxSort.checked) {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            const sorted = [...tasks].sort((a, b) => 
                (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
            );
            showFilteredTasks(sorted);
        } else {
            showAllTasks();
        }
    }
    ostLiTask();
};

const completedTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;
    const taskToComplete = tasks[index];

    taskToComplete.completed = true;
    
    if (flag_filter) {
        const selectedPriority = filterTaskPrioritySelect.value;
        const selectedType = filterTaskTypeSelect.value;
        const filteredTasks = tasks.filter(task => {
            return (selectedPriority === 'All' || task.priority === selectedPriority) &&
                   (selectedType === 'All' || task.type === selectedType);
        });
        if (checkboxSort && checkboxSort.checked) {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            const sorted = [...filteredTasks].sort((a, b) => 
                (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
            );
            showFilteredTasks(sorted);
        } else {
            showFilteredTasks(filteredTasks);
        }
    } else {
        if (checkboxSort && checkboxSort.checked) {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            const sorted = [...tasks].sort((a, b) => 
                (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
            );
            showFilteredTasks(sorted);
        } else {
            showAllTasks();
        }
    }
};

const editTask = (id) => {
    const taskEl = document.querySelector(`.taskItemV[data-id="${id}"]`);
    if (!taskEl) return;
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;
    const boxUpdate = taskEl.querySelector('.boxUpdate');
    boxUpdate.innerHTML = `
    <div class="editTaskContainer">
        <input type="text" class="editNameInput" placeholder="New task name" value="${tasks[index].name}"/>
        <input type="date" class="editDateInput" value="${tasks[index].date}"/>
        <div class="buttonsEditTask">
            <button class="cancelEditButton" onclick="cancelEditTask('${id}')">Cancel</button>
            <button class="saveEditButton" onclick="setValues('${id}', document.querySelector('.editNameInput')?.value, document.querySelector('.editDateInput')?.value)">Save</button>
        </div>
    </div>
    `;
};

const cancelEditTask = (id) => {
    const taskEl = document.querySelector(`.taskItemV[data-id="${id}"]`);
    if (!taskEl) return;
    const boxUpdate = taskEl.querySelector('.boxUpdate');
    if (boxUpdate) boxUpdate.innerHTML = '';
    flag_filter?filterButtonApply.click():showAllTasks();
};

const setValues = (id, newName, newDate) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return;
    tasks[index].name = newName;
    tasks[index].date = newDate;
    const taskEl = document.querySelector(`.taskItemV[data-id="${id}"]`);
    const boxUpdate = taskEl ? taskEl.querySelector('.boxUpdate') : null;
    if (boxUpdate) boxUpdate.innerHTML = '';
    flag_filter?filterButtonApply.click():showAllTasks();
};

//Drag and Drop
let draggedTaskId = null;

document.addEventListener('dragstart', (e) => {
    const taskEl = e.target.closest('.taskItemV');
    if (!taskEl) return;
    draggedTaskId = taskEl.getAttribute('data-id');
    if(taskEl.draggable)
    {
        taskEl.style.opacity = '0.5';
        taskEl.style.cursor = 'moving';
        e.dataTransfer.effectAllowed = 'move';
    }
});

document.addEventListener('dragend', (e) => {
    const taskEl = e.target.closest('.taskItemV');
    if (!taskEl) return;
    taskEl.style.opacity = '1';
    taskEl.style.cursor = 'grab';
    draggedTaskId = null;
});
document.addEventListener('dragover', (e) => {
    e.preventDefault();
});


document.addEventListener('drop', (e) => {
    e.preventDefault();
    const taskEl = e.target.closest('.taskItemV');
    if (!taskEl) return;
    const droppedTaskId = taskEl.getAttribute('data-id');
    if (draggedTaskId === droppedTaskId) return;

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const droppedIndex = tasks.findIndex(t => t.id === droppedTaskId);
    if (draggedIndex === -1 || droppedIndex === -1) return;

    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(droppedIndex, 0, draggedTask);

    if (flag_filter) {
        filterButtonApply.click();
    } else {
        showAllTasks();
    }
});
