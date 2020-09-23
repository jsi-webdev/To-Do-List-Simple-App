//jshint esversion:6

// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");

// Call - Load All Event Listener
loadEventListeners();

// Function - Load All Event Listener
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add Task Event
  form.addEventListener("submit", addTask);
  // Remove Task Event
  taskList.addEventListener("click", removeTask);
  // Clear All Task Event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Task Event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks in LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Add the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Add the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure to delete this item")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task From LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Clear All Task
function clearTasks() {
  // taskList.innerHTML = "";
  // Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear Tasks from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Task
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  taskList.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
