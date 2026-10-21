const newTaskInput = document.getElementById('new-task');
const addNewTaskButton = document.getElementById('add-new-task');
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const taskItem = document.createElement('li');

  const completionCheckbox = document.createElement('input');

  const label = document.createElement('label');

  const taskEditInput = document.createElement('input');

  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task';

  completionCheckbox.type = 'checkbox';
  taskEditInput.type = 'text';
  taskEditInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = '';
  deleteButton.appendChild(deleteButtonImg);

  taskItem.appendChild(completionCheckbox);
  taskItem.appendChild(label);
  taskItem.appendChild(taskEditInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value.trim()) return;
  const taskItem = createNewTaskElement(newTaskInput.value);

  incompleteTasksList.appendChild(taskItem);
  attachTaskEventListeners(taskItem, toggleTask);

  newTaskInput.value = '';
};

const editTask = function () {
  const taskItem = this.closest('li');

  const taskEditInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  if (isEditMode) {
    const taskText = taskEditInput.value.trim();

    if (!taskText) return;

    label.innerText = taskText;
    editButton.innerText = 'Edit';
  } else {
    taskEditInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  this.closest('li').remove();
};

const toggleTask = function (event) {
  const taskItem = event.currentTarget.closest('li');
  const isCompleted = event.currentTarget.checked;
  const targetList = isCompleted ? completedTasksList : incompleteTasksList;

  targetList.appendChild(taskItem);
};

addNewTaskButton.addEventListener('click', addTask);

const attachTaskEventListeners = function (taskListItem) {
  const completionCheckbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  completionCheckbox.addEventListener('change', toggleTask);
};

for (const task of [...completedTasksList.children, ...incompleteTasksList.children]) {
  attachTaskEventListeners(task);
}
