// // Link for the employee JSON
// const url = "assets/data/employees_data.json";

// // Load tasks from localStorage or set empty if none exist
// let tasks = (localStorage.tasks && JSON.parse(localStorage.tasks)) || [];

// // Only show tasks for "Ahmad Ali"
// let ahmadAliTasks = tasks.filter(task => task.assignMembersSelect.includes("Ahmad Ali"));

// // Load the tasks for "Ahmad Ali" on page load
// ahmadAliTasks.forEach(addTaskToPage);

// // Fetch employee data and only display "Ahmad Ali" in the dropdown
// async function loadEmployeeData() {
//   const response = await fetch(url);
//   const employees = await response.json();

//   // Only add "Ahmad Ali" to the employee select dropdown
//   const ahmadAli = employees.find(emp => emp["Full Name"] === "Ahmad Ali");
//   if (ahmadAli) {
//     addEmployeeToSelect(ahmadAli);
//   }
// }

// // Add an employee to the select dropdown
// function addEmployeeToSelect(employee) {
//   const selectEmployee = document.getElementById("AssignMembersSelect");
//   const option = document.createElement("option");
//   option.value = employee["Full Name"];
//   option.textContent = employee["Full Name"];
//   selectEmployee.appendChild(option);
// }

// // Add a task to the page (for Ahmad Ali's tasks)
// function addTaskToPage(task) {
//   const tasksGroup = document.querySelector(`.tasks-group.${task.status}`);
//   const taskContainer = tasksGroup.querySelector(".tasks-container");
//   const taskGroupHeader = tasksGroup.querySelector(".tasks-group-header span");

//   // Create the task card container
//   const taskCard = document.createElement("div");
//   taskCard.className = "task-card";
//   taskCard.id = `task-card-${task.id}`;

//   // Task Title
//   const taskTitle = document.createElement("h5");
//   taskTitle.className = "task-title";
//   taskTitle.textContent = task.taskTitle;

//   // Task Priority
//   const taskPriority = document.createElement("span");
//   taskPriority.className = `badge bg-${task.priority}`;
//   taskPriority.textContent = `Priority: ${task.priority}`;

//   // Task Description
//   const taskDescription = document.createElement("p");
//   taskDescription.className = "task-description";
//   taskDescription.textContent = `Description: ${task.description}`;

//   // Start Date
//   const startDate = document.createElement("p");
//   startDate.className = "task-start-date";
//   startDate.textContent = `Start Date: ${new Date(task.startDate).toLocaleDateString()}`;

//   // Due Date
//   const dueDate = document.createElement("p");
//   dueDate.className = "task-due-date";
//   dueDate.textContent = `Due Date: ${new Date(task.dueDate).toLocaleDateString()}`;

//   // Assigned Members
//   const assignedMembers = document.createElement("p");
//   assignedMembers.className = "task-assigned-members";
//   assignedMembers.textContent = `Assigned to: ${task.assignMembersSelect.join(", ")}`;

//   // Append all task details to the task card
//   taskCard.appendChild(taskTitle);
//   taskCard.appendChild(taskPriority);
//   taskCard.appendChild(taskDescription);
//   taskCard.appendChild(startDate);
//   taskCard.appendChild(dueDate);
//   taskCard.appendChild(assignedMembers);

//   // Add task card to the task container
//   taskContainer.appendChild(taskCard);

//   // Update the task counter in the group header
//   const taskCounter = taskGroupHeader.textContent.replace(/[^\d]/g, "");
//   taskGroupHeader.textContent = `(${+taskCounter + 1})`;
// }

// // Initialize the dropdown and tasks on page load
// document.addEventListener("DOMContentLoaded", () => {
//   loadEmployeeData();
// });


// Link for the employee JSON
const url = "assets/data/employees_data.json";
let badgeMapper = { high: "danger", medium: "warning", low: "primary" };

// Load tasks from localStorage or set empty if none exist
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Only show tasks for "Ahmad Ali"
let ahmadAliTasks = tasks.filter(task => task.assignMembersSelect.includes("Ahmad Ali"));

// Load the tasks for "Ahmad Ali" on page load
ahmadAliTasks.forEach(addTaskToPage);

// Fetch employee data and only display "Ahmad Ali" in the dropdown
async function loadEmployeeData() {
  const response = await fetch(url);
  const employees = await response.json();

  // Only add "Ahmad Ali" to the employee select dropdown
  const ahmadAli = employees.find(emp => emp["Full Name"] === "Ahmad Ali");
  if (ahmadAli) {
    addEmployeeToSelect(ahmadAli);
  }
}

// Add an employee to the select dropdown
function addEmployeeToSelect(employee) {
  const selectEmployee = document.getElementById("AssignMembersSelect");
  selectEmployee.innerHTML += `<option value="${employee["Full Name"]}">${employee["Full Name"]}</option>`;
}

// Add a task to the page (for Ahmad Ali's tasks)
function addTaskToPage(task) {
  const tasksGroup = document.querySelector(`.tasks-group.${task.status}`);
  const taskContainer = tasksGroup.querySelector(".tasks-container");
  const taskGroupHeader = tasksGroup.querySelector(".tasks-group-header span");

  //   // Create the task card using template literals
  //   const taskCardHTML = `
  //   <div class="card mb-3" id="task-card-${task.id}">
  //     <div class="card-header d-flex justify-content-between align-items-center">
  //       <h5 class="task-title">${task.taskTitle}</h5>
  //       <span class="badge bg-${task.priority}">${task.priority}</span>
  //     </div>
  //     <div class="card-body">
  //       <p class="task-description"><strong>Description:</strong> ${task.description}</p>
  //       <p class="task-start-date"><strong>Start Date:</strong> ${new Date(task.startDate).toLocaleDateString()}</p>
  //       <p class="task-due-date"><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
  //       <p class="task-assigned-members"><strong>Assigned to:</strong> ${task.assignMembersSelect.join(", ")}</p>
  //     </div>
  //     <div class="card-footer text-muted">
  //       <small>Last updated: ${new Date().toLocaleDateString()}</small>
  //     </div>
  //   </div>
  // `;
  const taskCardHTML = `
  <div class="task" id="task-card-${task.id}">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h5 class="task-title">${task.taskTitle}</h5>
       <div class="badge bg-${badgeMapper[task.priority]}">${task.priority}</div>
    </div>
    <div class="">
      <p class="task-description"><strong>Description:</strong> ${task.description}</p>
      <p class="task-start-date"><strong>Start:</strong> ${new Date(task.startDate).toLocaleDateString()}</p>
      <p class="task-due-date"><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
      <p class="task-assigned-members"> ${task.assignMembersSelect.join(" , ")}</p>
    </div>
  </div>
`;



  // Append the task card HTML to the task container
  taskContainer.innerHTML += taskCardHTML;

  // Update the task counter in the group header
  const taskCounter = parseInt(taskGroupHeader.textContent.replace(/[^\d]/g, "")) || 0;
  taskGroupHeader.textContent = `(${taskCounter + 1})`;
}

// Initialize the dropdown and tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  loadEmployeeData();
});
