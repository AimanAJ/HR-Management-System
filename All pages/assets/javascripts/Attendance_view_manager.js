// document.addEventListener("DOMContentLoaded", function () {
//     const attendanceTableBody = document.getElementById("attendance-table").querySelector("tbody");
//     const downloadButton = document.getElementById("downloadButton");

//     // Retrieve all attendance data from localStorage (no filtering by employeeId)
//     const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
//     console.log(attendanceData); // Debugging to ensure data is loading correctly

//     // Populate attendance table with all records
//     function populateAttendanceTable() {
//         attendanceTableBody.innerHTML = ""; // Clear previous table data
//         if (attendanceData.length > 0) {
//             attendanceData.forEach(record => {
//                 const row = `
//                     <tr>
//                         <td>${record.employeeName || 'N/A'}</td>
//                         <td>${record.date}</td>
//                         <td>${record.punchIn || 'N/A'}</td>
//                         <td>${record.punchOut || '---'}</td>
//                         <td>${record.workingHours || 'N/A'}</td>
//                     </tr>
//                 `;
//                 attendanceTableBody.innerHTML += row;
//             });
//         } else {
//             attendanceTableBody.innerHTML = "<tr><td colspan='5'>No attendance records found.</td></tr>";
//         }
//     }

//     // Function to download attendance table as an Excel sheet
//     function downloadAttendanceAsExcel() {
//         let table = document.getElementById("attendance-table");
//         let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
//         XLSX.writeFile(wb, "AttendanceRecords.xlsx");
//     }

//     // Bind download button to the Excel download function
//     downloadButton.addEventListener("click", downloadAttendanceAsExcel);

//     // Initialize the attendance table
//     populateAttendanceTable();
// });


document.addEventListener("DOMContentLoaded", function () {
    const attendanceTableBody = document.getElementById("attendance-table").querySelector("tbody");
    const downloadButton = document.getElementById("downloadButton");

    // Retrieve all attendance data from localStorage (no filtering by employeeId)
    const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    console.log(attendanceData); // Debugging to ensure data is loading correctly

    // Function to calculate working hours (hours and minutes) between punchIn and punchOut
    function calculateWorkingHours(punchIn, punchOut) {
        const inTime = new Date(punchIn);
        const outTime = new Date(punchOut);

        if (isNaN(inTime.getTime()) || isNaN(outTime.getTime())) {
            return '---';  // Invalid times, return placeholder
        }

        const diffMs = outTime - inTime;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // Calculate hours
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes

        return `${diffHours} hrs ${diffMinutes} mins`;
    }

    // Populate attendance table with all records
    function populateAttendanceTable() {
        attendanceTableBody.innerHTML = ""; // Clear previous table data
        if (attendanceData.length > 0) {
            attendanceData.forEach(record => {
                let workingHours = '---';
                
                // Calculate working hours only if punchIn and punchOut are both available
                if (record.punchIn && record.punchOut) {
                    workingHours = calculateWorkingHours(record.punchIn, record.punchOut);
                }

                const row = `
                    <tr>
                        <td>${record.employeeName || 'N/A'}</td>
                        <td>${record.date}</td>
                        <td>${record.punchIn || 'N/A'}</td>
                        <td>${record.punchOut || '---'}</td>
                        <td>${workingHours}</td>
                    </tr>
                `;
                attendanceTableBody.innerHTML += row;
            });
        } else {
            attendanceTableBody.innerHTML = "<tr><td colspan='5'>No attendance records found.</td></tr>";
        }
    }

    // Function to download attendance table as an Excel sheet
    function downloadAttendanceAsExcel() {
        let table = document.getElementById("attendance-table");
        let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
        XLSX.writeFile(wb, "AttendanceRecords.xlsx");
    }

    // Bind download button to the Excel download function
    downloadButton.addEventListener("click", downloadAttendanceAsExcel);

    // Initialize the attendance table
    populateAttendanceTable();
});
