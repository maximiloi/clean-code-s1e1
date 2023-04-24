const taskInput = document.querySelector('.task__input--new');
const addButton = document.querySelector('.task__button--add');
const incompleteTaskHolder = document.querySelector('.tasks__list--incomplete');
const completedTasksHolder = document.querySelector('.tasks__list--completed');

//New task list item
const createNewTaskElement = function (taskString) {
    const listItem = document.createElement('li');
    listItem.classList.add('task__item');

    const checkBox = document.createElement('input');
    checkBox.classList.add('task__checkbox');
    checkBox.type = 'checkbox';

    const label = document.createElement('label');
    label.classList.add('task__name');
    label.innerText = taskString;

    const editInput = document.createElement('input');
    editInput.classList.add('task__input');
    editInput.type = 'text';

    const editButton = document.createElement('button');
    editButton.classList.add('task__button', 'task__button--edit');
    editButton.innerText = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('task__button', 'task__button--delete');

    const deleteButtonImg = document.createElement('img');
    deleteButtonImg.classList.add('task__icon');
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = 'remove icon';

    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};

const addTask = function () {
    console.log('Add Task...');

    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
};

//Edit an existing task.
const editTask = function () {
    console.log('Edit Task...');
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector('.task__input');
    const label = listItem.querySelector('.task__name');
    const editBtn = listItem.querySelector('.task__button--edit');
    const containsClass = listItem.classList.contains('task__edit');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }

    listItem.classList.toggle('task__edit');
};

//Delete task.
const deleteTask = function () {
    console.log('Delete Task...');

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
};

//Mark task completed
const taskCompleted = function () {
    console.log('Complete Task...');

    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

//Mark task incomplete
const taskIncomplete = function () {
    console.log('Incomplete Task...');

    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log('bind list item events');

    const checkBox = taskListItem.querySelector('.task__checkbox');
    const editButton = taskListItem.querySelector('.task__button--edit');
    const deleteButton = taskListItem.querySelector('.task__button--delete');

    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
    checkBox.addEventListener('click', checkBoxEventHandler);
};

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);
