
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
  console.warn("Couldn't find the user in local storage.");
}

let formFields = {
  jopTitle,
  department,
  leaveType: document.getElementById("leaveType"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  reason: document.getElementById("reason"),
};

const modal = document.getElementById("new-leave-form");
if (!bootstrap.Modal.getInstance(modal)) {
  new bootstrap.Modal(modal);
}

let tableHeadings = [
  ["Employee", "Full Name"],
  ["Leave Type", "leaveType"],
  ["Reason", "reason"],
  ["Start Date", "startDate"],
  ["End Date", "endDate"],
];

let employeeData;

async function getEmployeeData() {
  const response = await fetch(url);
  employeeData = await response.json();
}

async function populateLeavesData() {
  leavesWithEmployeesData = [];
  await margeEmployeeDataWithLeaves();
  const filteredLeaves = leavesWithEmployeesData.filter(leave => leave["Full Name"] === "Ahmad Ali");
  createTable(table, filteredLeaves, tableHeadings);
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

  // Automatically select "Ahmad Ali" and set his department and job title
  const ahmadAli = employeeData.find(emp => emp["Full Name"] === "Ahmad Ali");
  if (ahmadAli) {
    employeeNameSelect.value = ahmadAli["Employee ID"];
    department.value = ahmadAli["Department"];
    jopTitle.value = ahmadAli["Job Title"];
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await addEmployeeNamesOptions();
  populateLeavesData();
});

employeeNameSelect.addEventListener("change", () => {
  const employee = employeeData.find(emp => emp["Employee ID"] === employeeNameSelect.value);
  department.value = employee["Department"];
  jopTitle.value = employee["Job Title"];
});

function crateNewLeave(leave) {
  leave.id = String(leaves.length);
  leaves.push(leave);
  localStorage.leaves = JSON.stringify(leaves);
  populateLeavesData();
  addAction("Create New Leave", `Create a new leave for ${employeeData.find(emp => emp["Employee ID"] === leave.employeeId)["Full Name"]}`);
}

// addEmployeeForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const formData = {
//     employeeId: formFields.employeeNameSelect.value,
//     leaveType: formFields.leaveType.value,
//     startDate: formFields.startDate.value,
//     endDate: formFields.endDate.value,
//     reason: formFields.reason.value,
//   };

//   crateNewLeave(formData);
//   resetForm();
//   startDate.value = new Date().toISOString().split("T")[0];
//   bootstrap.Modal.getInstance(modal).hide();
// });
addEmployeeForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the form from actually submitting and refreshing the page

  // Collecting form data
  const formData = {
    employeeId: formFields.employeeNameSelect.value,
    leaveType: formFields.leaveType.value,
    startDate: formFields.startDate.value,
    endDate: formFields.endDate.value,
    reason: formFields.reason.value,
  };

  // Validate if required fields are filled
  if (!formData.employeeId || !formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
    alert("Please fill out all fields before submitting.");
    return;
  }

  // Add leave to localStorage and reset form
  crateNewLeave(formData); // Create new leave entry
  resetForm(); // Reset form fields

  startDate.value = new Date().toISOString().split("T")[0]; // Reset start date to today

  // Close the modal
  bootstrap.Modal.getInstance(modal).hide();
});


async function margeEmployeeDataWithLeaves() {
  for (const leave of leaves) {
    if (!employeeData) {
      await getEmployeeData();
    }
    const employee = employeeData.find(emp => emp["Employee ID"] === leave.employeeId);
    leavesWithEmployeesData.push({ ...leave, ...employee });
  }
}

function resetForm() {
  formFields.leaveType.value = "";
  formFields.startDate.value = new Date().toISOString().split("T")[0];
  formFields.endDate.value = "";
  formFields.reason.value = "";
  formFields.jopTitle.value = "";
  formFields.department.value = "";
}
