import { createTable, filterTable } from "./table_maker.js";
let leavesWithEmployeesData = [];
const url = "assets/data/employees_data.json";
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

// Change this array to change the table columns
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

addEmployeeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get the data from the form
  const formData = {
    employeeId: formFields.employeeNameSelect.value,
    leaveType: formFields.leaveType.value,
    startDate: formFields.startDate.value,
    endDate: formFields.endDate.value,
    reason: formFields.reason.value,
  };

  debugger  
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

async function populateLeavesData() {
  // For getting the data in the table.
  leavesWithEmployeesData = [];
  await margeEmployeeDataWithLeaves();

  // Filter the leaves to only show for "Ahmad Ali"
  const filteredLeaves = leavesWithEmployeesData.filter(leave => 
    leave["Full Name"] === "Ahmad Ali"
  );

  // Create the table with filtered data
  createTable(table, filteredLeaves, tableHeadings);
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

function resetForm() {
  formFields.leaveType.value = "";
  formFields.startDate.value = new Date().toISOString().split("T")[0];
  formFields.endDate.value = "";
  formFields.reason.value = "";
  formFields.jopTitle.value = "";
  formFields.department.value = "";
  choices.setChoiceByValue("");
}
