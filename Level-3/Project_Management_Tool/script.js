const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
const taskDue = document.getElementById("task-due");
const taskCategory = document.getElementById("task-category");
const taskPriority = document.getElementById("task-priority");

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((task) => {
    tasks.push({
      text: task.querySelector(".task-text").textContent,
      priority: task.classList.contains("low")
        ? "low"
        : task.classList.contains("medium")
        ? "medium"
        : "high",
      category: task.dataset.category,
      dueDate: task.dataset.dueDate,
      completed: task
        .querySelector(".task-text")
        .classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(
      task.text,
      task.priority,
      task.category,
      task.dueDate,
      task.completed
    );
  });
}

// Add task to DOM
function addTaskToDOM(
  taskText,
  priority = "low",
  category = "work",
  dueDate = "",
  completed = false
) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task", priority); // Apply priority class
  taskDiv.dataset.category = category;
  taskDiv.dataset.dueDate = dueDate;

  const taskContent = document.createElement("span");
  taskContent.classList.add("task-text");
  taskContent.textContent = taskText;
  if (completed) taskContent.classList.add("completed");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = completed;
  taskCheckbox.addEventListener("change", function () {
    taskContent.classList.toggle("completed");
    saveTasks();
  });

  const taskDueText = document.createElement("span");
  taskDueText.classList.add("task-due");
  if (dueDate) {
    const dueDateObj = new Date(dueDate);
    taskDueText.textContent = `Due: ${dueDateObj.toLocaleDateString()}`;
  }

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    const newTaskText = prompt("Edit task:", taskContent.textContent);
    if (newTaskText) {
      taskContent.textContent = newTaskText;
      saveTasks();
    }
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(taskDiv);
    saveTasks();
  });

  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskContent);
  taskDiv.appendChild(taskDueText);
  taskDiv.appendChild(editButton);
  taskDiv.appendChild(deleteButton);

  taskList.appendChild(taskDiv);
}

// Handle form submit
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value;
  const priority = taskPriority.value;
  const category = taskCategory.value;
  const dueDate = taskDue.value;
  addTaskToDOM(taskText, priority, category, dueDate);
  saveTasks();
  taskInput.value = "";
  taskDue.value = "";
});

// Search/filter tasks
searchInput.addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();
    const taskPriority = task.classList.contains("low")
      ? "low"
      : task.classList.contains("medium")
      ? "medium"
      : "high";
    const taskCategory = task.dataset.category;
    if (
      taskText.includes(query) ||
      taskPriority.includes(query) ||
      taskCategory.includes(query)
    ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

// Load tasks on page load
loadTasks();
