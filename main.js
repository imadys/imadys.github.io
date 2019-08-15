// define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // DOM LOAD EVENT
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter
  filter.addEventListener('keyup', filterTask);
}

//get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // add class 
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';



    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });

}

// add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('لا تترك الحقل فارغ');
  }

  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // add class 
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';



  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // store in LS
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
}
// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('هل انت متأكد أنك تريد حذفها ؟')) {

      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


// clear tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // faster way to clear
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from ls
  clearTasksFromLocalStorage();
}
//clear from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    }
  );
}



function myBlue() {
  var x = document.querySelectorAll('.fa-trash-alt');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.color = '#3A34B3';
    document.querySelector('.btn').style.background = '#4B43E8';
    document.querySelector('.myBlack').style.background = '#3A34B3';

  }
  document.querySelector('.btn').style.background = '#4B43E8';
  document.querySelector('.myBlack').style.background = '#3A34B3';
}

function myRed() {
  var x = document.querySelectorAll('.fa-trash-alt');
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.color = '#E82F0C';

  }
  document.querySelector('.btn').style.background = '#FF0701';
  document.querySelector('.myBlack').style.background = '#E82F0C';
}

