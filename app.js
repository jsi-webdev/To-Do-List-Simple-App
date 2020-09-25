const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-btn");
const filter = document.querySelector("#filter");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    const link = document.createElement("a");
    link.classList.add("delete-item");
    link.classList.add("secondary-content");
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
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
  link.classList.add("delete-item");
  link.classList.add("secondary-content");
  // console.log(link);
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Append li to ul
  taskList.appendChild(li);
  // Clear input
  taskInput.value = "";
  // console.log(li);
  e.preventDefault();
}

// Store Task
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
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
    }
  }
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = "";

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
