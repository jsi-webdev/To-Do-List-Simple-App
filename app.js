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
  // Add Task Event
  form.addEventListener("submit", addTask);
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

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}
