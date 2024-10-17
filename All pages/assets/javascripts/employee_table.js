// import { createTable, filterTable } from "./table_maker.js";

// let table = document.querySelector("#employee-table");
// let filter;
// let data;

// // Default table heading, you can change them if you please.
// let table_heading = [
//   ["ID", "Employee ID"],
//   ["Name", "Full Name"],
//   ["Department", "Department"],
//   ["Job Title", "Job Title"],
//   ["Hire Date", "Hire Date"],
// ];

// // Get the data from the json file.
// async function getData() {
//   if (!data) {
//     let response = await fetch("assets/data/employees_data.json");
//     data = await response.json();
//   }
// }

// await getData();

// // For getting the filter key word from the user and filter the table
// let filterInput = document.getElementById("filter");
// try {
//   filterInput.addEventListener("input", (e) => {
//     filter = filterInput.value.toLowerCase();
//     filterTable(filter);
//   });
// } catch (error) {
//   console.warn("Couldn't find the filter for the table.");
// }

// // For the choose columns for the employees table
// try {
//   let tableColumnsSelector = document.getElementById("employee-table-columns");
//   // Loop over the keys for the employee and add an option for each one
//   for (const key in data[0]) {
//     const li = document.createElement("li");
//     li.className = "dropdown-item";

//     const input = document.createElement("input");
//     input.className = "form-check-input";
//     input.type = "checkbox";
//     input.value = key;
//     input.id = key.replace(" ", "_");

//     const label = document.createElement("label");
//     label.className = "form-check-label ms-1";
//     label.htmlFor = key.replace(" ", "_");

//     input.addEventListener("change", (event) => {
//       if (input.checked) {
//         table_heading.push([label.innerText, input.value]);
//       } else {
//         table_heading = table_heading.filter((val) => val[1] !== input.value);
//       }
//       createTable(table, data, table_heading);
//     });

//     li.appendChild(input);
//     li.appendChild(label);
//     const colName = table_heading.find((val) => val[1] === key);
//     if (colName) {
//       input.checked = true;
//       label.innerText = colName[0];
//     } else {
//       label.innerText = key;
//     }
//     tableColumnsSelector.appendChild(li);
//   }
// } catch (error) {
//   console.warn(
//     "You should add the 'heading option' component in order to add or remove table columns"
//   );
// }

// // Add data to the table in the start of the code
// createTable(table, data, table_heading);
















// import { createTable, filterTable } from "./table_maker.js";

// // DOM Elements
// let table = document.querySelector("#employee-table");
// let filterInput = document.getElementById("filter");
// let data; // Employee data

// // Table headings
// let table_heading = [
//     ["ID", "Employee ID"],
//     ["Name", "Full Name"],
//     ["Department", "Department"],
//     ["Job Title", "Job Title"],
//     ["Hire Date", "Hire Date"],
//     ["Action", "Action"] // New column for the View Attendance button
// ];

// // Fetch employee data
// async function getData() {
//     if (!data) {
//         let response = await fetch("assets/data/employees_data.json");
//         data = await response.json();
//     }
// }
// await getData();

// // Function to create table with View Attendance buttons
// function createTableWithAttendanceButton() {
//     table.querySelector("tbody").innerHTML = ""; // Clear the table
//     data.forEach((employee) => {
//         const row = document.createElement("tr");

//         table_heading.forEach(([heading, key]) => {
//             const cell = document.createElement("td");
//             if (key === "Action") {
//                 // Add View Attendance button
//                 const viewButton = document.createElement("button");
//                 viewButton.className = "btn btn-info";
//                 viewButton.innerText = "View Attendance";
//                 viewButton.addEventListener("click", () => {
//                     // Redirect to attendance page with employee ID in URL
//                     window.location.href = `Attendance_view.html?employeeId=${employee["Employee ID"]}`;
//                 });
//                 cell.appendChild(viewButton);
//             } else {
//                 cell.innerText = employee[key];
//             }
//             row.appendChild(cell);
//         });
//         table.querySelector("tbody").appendChild(row);
//     });
// }

// // Filter employee table
// filterInput.addEventListener("input", (e) => {
//     filterTable(e.target.value.toLowerCase());
// });

// // Initialize the table with View Attendance buttons
// createTableWithAttendanceButton();





















// import { createTable, filterTable } from "./table_maker.js";

// // DOM Elements
// let table = document.querySelector("#employee-table");
// let filterInput = document.getElementById("filter");
// let data; // Employee data

// // Table headings
// let table_heading = [
//     ["ID", "Employee ID"],
//     ["Name", "Full Name"],
//     ["Department", "Department"],
//     ["Job Title", "Job Title"],
//     ["Hire Date", "Hire Date"],
//     ["Action", "Action"] // New column for the View Attendance button
// ];

// // Fetch employee data
// async function getData() {
//     if (!data) {
//         let response = await fetch("assets/data/employees_data.json");
//         data = await response.json();
//         // Store data in local storage
//         localStorage.setItem("employees", JSON.stringify(data));
//     }
// }

// // Load employee data from local storage
// function loadEmployeesFromLocalStorage() {
//     const employees = localStorage.getItem("employees");
//     if (employees) {
//         data = JSON.parse(employees);
//         createTableWithAttendanceButton(); // Populate table with data from local storage
//     } else {
//         console.error("No employee data found in local storage.");
//     }
// }

// // Function to create table with View Attendance buttons
// function createTableWithAttendanceButton() {
//     table.querySelector("tbody").innerHTML = ""; // Clear the table
//     data.forEach((employee) => {
//         const row = document.createElement("tr");

//         table_heading.forEach(([heading, key]) => {
//             const cell = document.createElement("td");
//             if (key === "Action") {
//                 // Add View Attendance button
//                 const viewButton = document.createElement("button");
//                 viewButton.className = "btn btn-info";
//                 viewButton.innerText = "View Attendance";
//                 viewButton.addEventListener("click", () => {
//                     // Redirect to attendance page with employee ID in URL
//                     window.location.href = `Attendance_view.html?employeeId=${employee["Employee ID"]}`;
//                 });
//                 cell.appendChild(viewButton);
//             } else {
//                 cell.innerText = employee[key];
//             }
//             row.appendChild(cell);
//         });
//         table.querySelector("tbody").appendChild(row);
//     });
// }

// // Filter employee table
// filterInput.addEventListener("input", (e) => {
//     filterTable(e.target.value.toLowerCase());
// });

// // Initialize the employee data and create the table
// await getData();
// loadEmployeesFromLocalStorage();




import { createTable, filterTable } from "./table_maker.js";

// DOM Elements
let table = document.querySelector("#employee-table");
let filterInput = document.getElementById("filter");
let data; // Employee data

// Table headings
let table_heading = [
    ["ID", "Employee ID"],
    ["Name", "Full Name"],
    ["Department", "Department"],
    ["Job Title", "Job Title"],
    ["Hire Date", "Hire Date"],
    ["Action", "Action"] // New column for the View Attendance button
];

// Fetch employee data
async function getData() {
    if (!data) {
        let response = await fetch("assets/data/employees_data.json");
        data = await response.json();
        // Store data in local storage
        if (!localStorage.getItem("employees")) {
            localStorage.setItem("employees", JSON.stringify(data));
        }
    }
}

// Load employee data from local storage
function loadEmployeesFromLocalStorage() {
    const employees = localStorage.getItem("employees");
    if (employees) {
        data = JSON.parse(employees);
        createTableWithAttendanceButton(); // Populate table with data from local storage
    } else {
        console.error("No employee data found in local storage.");
    }
}

// Function to create table with View Attendance buttons
function createTableWithAttendanceButton() {
    table.querySelector("tbody").innerHTML = ""; // Clear the table
    data.forEach((employee) => {
        const row = document.createElement("tr");

        table_heading.forEach(([heading, key]) => {
            const cell = document.createElement("td");
            if (key === "Action") {
                // Add View Attendance button
                const viewButton = document.createElement("button");
                viewButton.className = "btn btn-info";
                viewButton.innerText = "View Attendance";
                viewButton.addEventListener("click", () => {
                    // Redirect to attendance page with employee ID in URL
                    window.location.href = `Attendance_view.html?employeeId=${employee["Employee ID"]}`;
                });
                cell.appendChild(viewButton);
            } else {
                cell.innerText = employee[key];
            }
            row.appendChild(cell);
        });
        table.querySelector("tbody").appendChild(row);
    });
}

// Filter employee table
filterInput.addEventListener("input", (e) => {
    filterTable(e.target.value.toLowerCase());
});

// Initialize the employee data and create the table
await getData();
loadEmployeesFromLocalStorage();

// Handle new employee form submission
document.getElementById("add-employee-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get values from the form
    const employeeId = document.getElementById("EmployeeID").value;
    const employeeName = document.getElementById("EmployeeName").value;
    const department = document.getElementById("Department").value;
    const jobTitle = document.getElementById("JobTitle").value;
    const hireDate = document.getElementById("HireDate").value;

    // Create new employee object
    const newEmployee = {
        "Employee ID": employeeId,
        "Full Name": employeeName,
        "Department": department,
        "Job Title": jobTitle,
        "Hire Date": hireDate
    };

    // Add the new employee to the data array
    data.push(newEmployee);

    // Save updated data to local storage
    localStorage.setItem("employees", JSON.stringify(data));

    // Reload the table with updated data
    createTableWithAttendanceButton();

    // Clear the form
    event.target.reset();

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('new-employee-form'));
    modal.hide();
});