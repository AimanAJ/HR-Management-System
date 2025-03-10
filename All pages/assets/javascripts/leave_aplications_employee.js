// // Global variables
// let leavesWithEmployeesData = [];
// const url = "assets/data/employees_data.json";
// const addEmployeeForm = document.getElementById("create-leave-form");
// const employeeNameSelect = document.getElementById("employee-name");
// const jopTitle = document.getElementById("jop-title");
// const department = document.getElementById("department");
// const startDate = document.getElementById("startDate");
// const leaveTableBody = document.querySelector("table tbody"); // Target the table's tbody

// startDate.value = new Date().toISOString().split("T")[0]; // Default start date

// let leaves = (localStorage.leaves && JSON.parse(localStorage.leaves)) || [];
// let employeeData;

// // Define form fields
// let formFields = {
//   jopTitle,
//   department,
//   leaveType: document.getElementById("leaveType"),
//   startDate: document.getElementById("startDate"),
//   endDate: document.getElementById("endDate"),
//   reason: document.getElementById("reason"),
// };

// // Modal for the leave form
// const modal = document.getElementById("new-leave-form");
// if (!bootstrap.Modal.getInstance(modal)) {
//   new bootstrap.Modal(modal);
// }

// // Fetch employee data from JSON
// async function getEmployeeData() {
//   const response = await fetch(url);
//   employeeData = await response.json();
// }

// // Populate employee dropdown and auto-select "Ahmad Ali"
// async function addEmployeeNamesOptions() {
//   if (!employeeData) {
//     await getEmployeeData();
//   }
//   employeeData.forEach((employee) => {
//     const option = document.createElement("option");
//     option.value = employee["Employee ID"];
//     option.textContent = employee["Full Name"];
//     employeeNameSelect.appendChild(option);
//   });

//   // Automatically select "Ahmad Ali"
//   const ahmadAli = employeeData.find(emp => emp["Full Name"] === "Ahmad Ali");
//   if (ahmadAli) {
//     employeeNameSelect.value = ahmadAli["Employee ID"];
//     department.value = ahmadAli["Department"];
//     jopTitle.value = ahmadAli["Job Title"];
//   }
// }

// // Function to create a new leave
// function createNewLeave(leave) {
//   leave.id = String(leaves.length); // Assign a unique ID
//   leaves.push(leave);
//   localStorage.leaves = JSON.stringify(leaves); // Save to localStorage
//   populateLeavesData(); // Refresh the table
// }

// // Function to create and populate the table with leaves data
// function populateLeavesData() {
//   leaveTableBody.innerHTML = ""; // Clear the existing table body

//   if (leaves.length === 0) {
//     leaveTableBody.innerHTML = "<tr><td colspan='5'>No leaves found</td></tr>"; // Display a message if no leaves
//     return;
//   }

//   // Loop through the leaves and create table rows
//   leaves.forEach((leave) => {
//     const employee = employeeData.find(emp => emp["Employee ID"] === leave.employeeId);
//     if (!employee) return;

//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${employee["Full Name"]}</td>
//       <td>${leave.leaveType}</td>
//       <td>${leave.reason}</td>
//       <td>${leave.startDate}</td>
//       <td>${leave.endDate}</td>
//     `;

//     leaveTableBody.appendChild(row);
//   });
// }

// // Update department and job title based on employee selection
// employeeNameSelect.addEventListener("change", () => {
//   const selectedEmployee = employeeData.find(emp => emp["Employee ID"] === employeeNameSelect.value);
//   if (selectedEmployee) {
//     department.value = selectedEmployee["Department"];
//     jopTitle.value = selectedEmployee["Job Title"];
//   }
// });

// // Handle form submission
// addEmployeeForm.addEventListener("submit", (event) => {
//   event.preventDefault(); // Prevent page refresh

//   // Collect form data
//   const formData = {
//     employeeId: employeeNameSelect.value,
//     leaveType: formFields.leaveType.value,
//     startDate: formFields.startDate.value,
//     endDate: formFields.endDate.value,
//     reason: formFields.reason.value,
//   };

//   // Validate if required fields are filled
//   if (!formData.employeeId || !formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
//     alert("Please fill out all fields before submitting.");
//     return;
//   }

//   // Create a new leave
//   createNewLeave(formData);
//   resetForm(); // Reset form fields

//   startDate.value = new Date().toISOString().split("T")[0]; // Reset start date to today
//   bootstrap.Modal.getInstance(modal).hide(); // Close the modal
// });

// // Function to reset form fields after submission
// function resetForm() {
//   formFields.leaveType.value = "";
//   formFields.startDate.value = new Date().toISOString().split("T")[0];
//   formFields.endDate.value = "";
//   formFields.reason.value = "";
//   formFields.jopTitle.value = "";
//   formFields.department.value = "";

//   // Reset employee selection to "Ahmad Ali"
//   const ahmadAli = employeeData.find(emp => emp["Full Name"] === "Ahmad Ali");
//   if (ahmadAli) {
//     employeeNameSelect.value = ahmadAli["Employee ID"];
//     department.value = ahmadAli["Department"];
//     jopTitle.value = ahmadAli["Job Title"];
//   }
// }

// // Load employee data and populate leaves on page load
// document.addEventListener("DOMContentLoaded", async function () {
//   await addEmployeeNamesOptions();
//   populateLeavesData(); // Display existing leaves
// });


















// import { createTable, filterTable } from "./table_maker.js";
// let editMode = false;
// let editLeave = null;
// let leavesWithEmployeesData = [];
// const url = "assets/data/employees_data.json";
// const addEmployeeForm = document.getElementById("create-leave-form");
// const employeeNameSelect = document.getElementById("employee-name");
// const jopTitle = document.getElementById("jop-title");
// const department = document.getElementById("department");
// const startDate = document.getElementById("startDate");
// startDate.value = new Date().toISOString().split("T")[0];
// let leaves = (localStorage.leaves && JSON.parse(localStorage.leaves)) || [];
// const table = document.querySelector("table");
// let user;
// try {
//   user = JSON.parse(localStorage.loggedInUser);
// } catch (error) {
//   console.warn("Couldn't find the user in the local storage.");
// }

// function addAction(actionTitle, actionBody) {
//   let actions =
//     (localStorage.actions && JSON.parse(localStorage.actions)) || [];
//   actions.push({
//     id: actions.length,
//     date: new Date(),
//     actionTitle,
//     actionBody,
//     user,
//   });
//   localStorage.actions = JSON.stringify(actions);
// }

// // Get the form fields to for easy use.
// let formFields = {
//   jopTitle,
//   department,
//   employeeNameSelect,
//   leaveType: document.getElementById("leaveType"),
//   startDate: document.getElementById("startDate"),
//   endDate: document.getElementById("endDate"),
//   reason: document.getElementById("reason"),
// };

// // initialize the modal so we can show it and close it later.
// const modal = document.getElementById("new-leave-form");
// if (!bootstrap.Modal.getInstance(modal)) {
//   new bootstrap.Modal(modal);
// }

// let filter = "";

// // Change the this array to change the table columns
// let tableHeadings = [
//   ["Employee", "Full Name"],
//   ["Leave Type", "leaveType"],
//   ["Reason", "reason"],
//   ["Start Date", "startDate"],
//   ["End Date", "endDate"],
// ];

// // Get all employee data to put them in the select
// let employeeData;

// async function getEmployeeData() {
//   const response = await fetch(url);
//   employeeData = await response.json();
// }
// async function addEmployeeNamesOptions() {
//   if (!employeeData) {
//     await getEmployeeData();
//   }
//   employeeData.forEach((employee) => {
//     const option = document.createElement("option");
//     option.value = employee["Employee ID"];
//     option.textContent = employee["Full Name"];
//     employeeNameSelect.appendChild(option);
//   });
// }

// // This part for the searchable select. Do not touch it unless you really know what you are doing.
// let choices;
// document.addEventListener("DOMContentLoaded", async function () {
//   await addEmployeeNamesOptions();
//   choices = new Choices(employeeNameSelect, {
//     searchEnabled: true,
//     placeholderValue: "Select Employee",
//     shouldSort: false,
//   });
//   populateLeavesData();
// });

// // Auto fill the employee data in the fields
// employeeNameSelect.addEventListener("change", () => {
//   const employee = employeeData.find(
//     (employee) => employee["Employee ID"] === employeeNameSelect.value
//   );
//   department.value = employee["Department"];
//   jopTitle.value = employee["Job Title"];
// });

// // Add the form data into the local storage
// function crateNewLeave(leave) {
//   leave.id = String(leaves.length);
//   leaves.push(leave);
//   localStorage.leaves = JSON.stringify(leaves);

//   populateLeavesData();
//   addAction(
//     "Create New Leave",
//     "Create a new leave for " +
//       employeeData.find(
//         (employee) => employee["Employee ID"] === leave.employeeId
//       )["Full Name"]
//   );
// }

// // Update existing leave
// function updateLeave(leave) {
//   leave.id = editLeave;

//   leaves = leaves.map((oldLeave) =>
//     oldLeave.id === editLeave ? leave : oldLeave
//   );
//   localStorage.leaves = JSON.stringify(leaves);

//   populateLeavesData();
//   addAction(
//     "Leave Updated",
//     "Update the leave for " +
//       employeeData.find(
//         (employee) => employee["Employee ID"] === leave.employeeId
//       )["Full Name"]
//   );
// }

// addEmployeeForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   // Get the data from the form
//   bootstrap.Modal.getInstance(modal).hide();
//   // resetForm();

//   const formData = {
//     employeeId: "Ayman Aljaradat",
//     leaveType: formFields.leaveType.value,
//     startDate: formFields.startDate.value,
//     endDate: formFields.endDate.value,
//     reason: formFields.reason.value,
//     status: "Pending",
//   };

//   if (editMode) {
//     editMode = false;
//     updateLeave(formData);
//     bootstrap.Modal.getInstance(modal).hide();
//     resetForm();
//     return;
//   }

//   crateNewLeave(formData);
//   resetForm();

//   startDate.value = new Date().toISOString().split("T")[0];

//   // Close the modal
//   bootstrap.Modal.getInstance(modal).hide();
// });

// async function margeEmployeeDataWithLeaves() {
//   for (const leave of leaves) {
//     if (!employeeData) {
//       await getEmployeeData();
//     }
//     const employee = employeeData.find(
//       (employee) => employee["Employee ID"] === leave["employeeId"]
//     );
//     // Merge the employee data with the leave application
//     leavesWithEmployeesData.push({
//       ...leave,
//       ...employee,
//     });
//   }
// }























import { createTable, filterTable } from "./table_maker.js";
let editMode = false;
let editLeave = null;
let leavesWithEmployeesData = [];
const url = "assets/data/employees_data2.json";
const addEmployeeForm = document.getElementById("create-leave-form");
const employeeNameSelect = document.getElementById("employee-name");
const jopTitle = document.getElementById("jop-title");
const department = document.getElementById("department");
const startDate = document.getElementById("startDate");
startDate.value = new Date().toISOString().split("T")[0];
let leaves = (localStorage.leaves && JSON.parse(localStorage.leaves)) || [];
const table = document.querySelector("table");
let user;
try {
  user = JSON.parse(localStorage.loggedInUser);
} catch (error) {
  console.warn("Couldn't find the user in the local storage.");
}

function addAction(actionTitle, actionBody) {
  let actions =
    (localStorage.actions && JSON.parse(localStorage.actions)) || [];
  actions.push({
    id: actions.length,
    date: new Date(),
    actionTitle,
    actionBody,
    user,
  });
  localStorage.actions = JSON.stringify(actions);
}

// Get the form fields to for easy use.
let formFields = {
  jopTitle,
  department,
  employeeNameSelect,
  leaveType: document.getElementById("leaveType"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  reason: document.getElementById("reason"),
};

// initialize the modal so we can show it and close it later.
const modal = document.getElementById("new-leave-form");
if (!bootstrap.Modal.getInstance(modal)) {
  new bootstrap.Modal(modal);
}

let filter = "";

// Change the this array to change the table columns
let tableHeadings = [
  ["Employee", "Full Name"],
  ["Leave Type", "leaveType"],
  ["Reason", "reason"],
  ["Start Date", "startDate"],
  ["End Date", "endDate"],
];

// Get all employee data to put them in the select
let employeeData;

async function getEmployeeData() {
  const response = await fetch(url);
  employeeData = await response.json();
}
async function addEmployeeNamesOptions() {
  if (!employeeData) {
    await getEmployeeData();
  }
  employeeData.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee["Employee ID"];
    option.textContent = employee["Full Name"];
    employeeNameSelect.appendChild(option);
  });
}

// This part for the searchable select. Do not touch it unless you really know what you are doing.
let choices;
document.addEventListener("DOMContentLoaded", async function () {
  await addEmployeeNamesOptions();
  choices = new Choices(employeeNameSelect, {
    searchEnabled: true,
    placeholderValue: "Select Employee",
    shouldSort: false,
  });
  populateLeavesData();
});

// Auto fill the employee data in the fields
employeeNameSelect.addEventListener("change", () => {
  const employee = employeeData.find(
    (employee) => employee["Employee ID"] === employeeNameSelect.value
  );
  department.value = employee["Department"];
  jopTitle.value = employee["Job Title"];
});

// Add the form data into the local storage
function crateNewLeave(leave) {
  leave.id = String(leaves.length);
  leaves.push(leave);
  localStorage.leaves = JSON.stringify(leaves);

  populateLeavesData();
  addAction(
    "Create New Leave",
    "Create a new leave for " +
    employeeData.find(
      (employee) => employee["Employee ID"] === leave.employeeId
    )["Full Name"]
  );
}

// Update existing leave
function updateLeave(leave) {
  leave.id = editLeave;

  leaves = leaves.map((oldLeave) =>
    oldLeave.id === editLeave ? leave : oldLeave
  );
  localStorage.leaves = JSON.stringify(leaves);

  populateLeavesData();
  addAction(
    "Leave Updated",
    "Update the leave for " +
    employeeData.find(
      (employee) => employee["Employee ID"] === leave.employeeId
    )["Full Name"]
  );
}

addEmployeeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get the data from the form
  bootstrap.Modal.getInstance(modal).hide();
  // resetForm();

  const formData = {
    employeeId: "Ayman Aljaradat",
    leaveType: formFields.leaveType.value,
    startDate: formFields.startDate.value,
    endDate: formFields.endDate.value,
    reason: formFields.reason.value,
    status: "Pending",
  };

  if (editMode) {
    editMode = false;
    updateLeave(formData);
    bootstrap.Modal.getInstance(modal).hide();
    resetForm();
    return;
  }

  crateNewLeave(formData);
  resetForm();

  startDate.value = new Date().toISOString().split("T")[0];

  // Close the modal
  bootstrap.Modal.getInstance(modal).hide();
});

async function margeEmployeeDataWithLeaves() {
  for (const leave of leaves) {
    if (!employeeData) {
      await getEmployeeData();
    }
    const employee = employeeData.find(
      (employee) => employee["Employee ID"] === leave["employeeId"]
    );
    // Merge the employee data with the leave application
    leavesWithEmployeesData.push({
      ...leave,
      ...employee,
    });
  }
}

function populateLeavesData() {
  const tbody = document.getElementById("leave-table-body");
  tbody.innerHTML = "";

  leaves.forEach((leave) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${leave.employeeId}</td>
      <td>${leave.leaveType}</td>
      <td>${leave.reason}</td>
      <td>${leave.startDate}</td>
      <td>${leave.endDate}</td>
      <td>${leave.status}</td>  <!-- Display leave status here -->
    `;

    tbody.appendChild(row);
  });
}

// For filtering
let filterInput = document.getElementById("filter");
try {
  filterInput.addEventListener("input", (e) => {
    filter = filterInput.value.toLowerCase();
    filterTable(filter);
  });
} catch (error) {
  console.warn("Couldn't find the filter for the table.");
}

// For the choose columns for the leaves table.
try {
  let tableColumnsSelector = document.getElementById("leave-columns-selector");
  // Loop over the keys for the employee and add an option for each one
  await margeEmployeeDataWithLeaves();
  for (const key in leavesWithEmployeesData[0]) {
    const li = document.createElement("li");
    li.className = "dropdown-item";

    const input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.value = key;
    input.id = key.replace(" ", "_");

    const label = document.createElement("label");
    label.className = "form-check-label ms-1";
    label.htmlFor = key.replace(" ", "_");

    input.addEventListener("change", (event) => {
      if (input.checked) {
        tableHeadings.push([label.innerText, input.value]);
      } else {
        tableHeadings = tableHeadings.filter((val) => val[1] !== input.value);
      }
      createTable(table, leavesWithEmployeesData, tableHeadings);
    });

    li.appendChild(input);
    li.appendChild(label);
    const colName = tableHeadings.find((val) => val[1] === key);
    if (colName) {
      input.checked = true;
      label.innerText = colName[0];
    } else {
      label.innerText = key;
    }
    tableColumnsSelector.appendChild(li);
  }
} catch (error) {
  console.warn(
    "You should add the 'heading option' component in order to add or remove table columns"
  );
}

// Populate the form with the leave data
function populateLeaveForm(leave) {
  choices.setChoiceByValue(leave.employeeId);
  formFields.jopTitle.value = employeeData.find(
    (employee) => employee["Employee ID"] === leave.employeeId
  )["Job Title"];
  formFields.department.value = employeeData.find(
    (employee) => employee["Employee ID"] === leave.employeeId
  )["Department"];
  formFields.leaveType.value = leave.leaveType;
  formFields.startDate.value = leave.startDate;
  formFields.endDate.value = leave.endDate;
  formFields.reason.value = leave.reason;
}

document.addEventListener("click", (event) => {
  // git the parent of the target element
  const target = event.target.parentNode;
  if (target.tagName === "TR") {
    editMode = true;
    editLeave = target.id;
    let leave = leaves.find((leave) => leave.id === editLeave);
    populateLeaveForm(leave);
    bootstrap.Modal.getInstance(modal).show();
  }
});

modal.addEventListener("show.bs.modal", () => {
  if (editMode) {
    document.getElementById("new-leave-formLabel").innerText = "Edit Leave";
  } else {
    document.getElementById("new-leave-formLabel").innerText = "Add Leave";
  }
});

// reset the form when the modal is closed
modal.addEventListener("hidden.bs.modal", () => {
  editMode = false;
  resetForm();
});

function resetForm() {
  formFields.leaveType.value = "";
  formFields.startDate.value = new Date().toISOString().split("T")[0];
  formFields.endDate.value = "";
  formFields.reason.value = "";
  formFields.jopTitle.value = "";
  formFields.department.value = "";
  choices.setChoiceByValue("");
}


// Add the buttons to the table
function createEditButtons() {
  const editButton = document.createElement("button");
  editButton.className = "btn btn-primary";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    bootstrap.Modal.getInstance(modal).show();
  });
  let td = document.createElement("td")
  td.appendChild(editButton);
  return td;
}



