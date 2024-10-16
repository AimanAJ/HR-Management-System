// document.addEventListener("DOMContentLoaded", function() {
//     const punchInButton = document.getElementById("punchInButton");
//     const punchOutButton = document.getElementById("punchOutButton");
//     const attendanceTableBody = document.getElementById("attendanceTable").querySelector("tbody");

//     // Retrieve the attendance data from local storage, or create a new object if it doesn't exist
//     let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || {};


//     const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     console.log(currentUser);
//     // Check if currentUser is available
//     if (!currentUser) {
//         console.error("User data not found in local storage. Please set the lookedInUser object.");
//         return; // Stop execution if user data is not available
//     }

//     const today = new Date();
//     const todayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

//     // Function to update the attendance table
//     function updateAttendanceTable() {
//         attendanceTableBody.innerHTML = ""; // Clear existing rows
//         for (const date in attendanceData) {
//             const record = attendanceData[date];
//             const row = `<tr>
//                 <td>${date}</td>
//                 <td>${record.employeeName}</td>
//                 <td>${record.jobTitle}</td>
//                 <td>${record.punchIn || 'N/A'}</td>
//                 <td>${record.punchOut || '---'}</td>
//             </tr>`;
//             attendanceTableBody.innerHTML += row;
//         }
//     }

//     // Punch In functionality
//     punchInButton.addEventListener("click", function() {
//         const punchInTime = new Date().toLocaleTimeString(); // Get current time

//         // Check if the user has already punched in today
//         if (!attendanceData[todayDate] || !attendanceData[todayDate].punchIn) {
//             attendanceData[todayDate] = {
//                 employeeName: currentUser.name,
//                 jobTitle: currentUser.title,
//                 punchIn: punchInTime,
//                 punchOut: null
//             };
//             localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
//             punchInButton.disabled = true; // Disable Punch In button
//             punchOutButton.disabled = false; // Enable Punch Out button
//             updateAttendanceTable();
//         } else {
//             alert("You have already punched in for today.");
//         }
//     });

//     // Punch Out functionality
//     punchOutButton.addEventListener("click", function() {
//         const punchOutTime = new Date().toLocaleTimeString(); // Get current time
//         if (attendanceData[todayDate]) {
//             if (!attendanceData[todayDate].punchOut) {
//                 attendanceData[todayDate].punchOut = punchOutTime;
//                 localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
//                 punchOutButton.disabled = true; // Disable Punch Out button
//                 updateAttendanceTable();
//             } else {
//                 alert("You have already punched out for today.");
//             }
//         }
//     });

//     // Load existing attendance records
//     updateAttendanceTable();
// });








// document.addEventListener("DOMContentLoaded", function () {
//     const punchInButton = document.getElementById("punchInButton");
//     const punchOutButton = document.getElementById("punchOutButton");
//     const attendanceTableBody = document.getElementById("attendanceTable").querySelector("tbody");

//     // Get attendance data from localStorage or initialize it if it's not there
//     let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || {};
//     const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

//     if (!currentUser) {
//         alert("No user is logged in.");
//         return;
//     }

//     const today = new Date();
//     const todayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

//     // Function to calculate working hours
//     function calculateWorkingHours(punchIn, punchOut) {
//         if (!punchIn || !punchOut) return '---'; // If either is missing, return N/A

//         // Get the hours and minutes from the punchIn and punchOut times
//         const [punchInHours, punchInMinutes] = punchIn.split(':').map(Number);
//         const [punchOutHours, punchOutMinutes] = punchOut.split(':').map(Number);

//         // Calculate the difference in hours and minutes
//         const totalPunchInMinutes = punchInHours * 60 + punchInMinutes;
//         const totalPunchOutMinutes = punchOutHours * 60 + punchOutMinutes;

//         // Difference in minutes
//         const diffMinutes = totalPunchOutMinutes - totalPunchInMinutes;

//         // Convert minutes back to hours and minutes
//         const diffHrs = Math.floor(diffMinutes / 60);
//         const diffMins = diffMinutes % 60;

//         return `${diffHrs} hrs ${diffMins} mins`;
//     }


//     // Function to update the attendance table
//     // Function to update the attendance table
//     function updateAttendanceTable() {
//         attendanceTableBody.innerHTML = ""; // Clear existing rows
//         for (const date in attendanceData) {
//             const record = attendanceData[date];
//             const workingHours = calculateWorkingHours(record.punchIn, record.punchOut);
//             const row = `<tr>
//             <td>${date}</td>
//             <td>${record.employeeName}</td>
//             <td>${record.jobTitle}</td>
//             <td>${record.punchIn || 'N/A'}</td>
//             <td>${record.punchOut || '---'}</td>
//             <td>${workingHours}</td>
//         </tr>`;
//             attendanceTableBody.innerHTML += row;
//         }
//     }


//     // Punch In functionality
//     punchInButton.addEventListener("click", function () {
//         const punchInTime = new Date().toLocaleTimeString(); // Get current time
//         attendanceData[todayDate] = {
//             employeeName: currentUser.name,
//             jobTitle: currentUser.title,
//             punchIn: punchInTime,
//             punchOut: null
//         };
//         localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
//         punchInButton.disabled = true;
//         punchOutButton.disabled = false;
//         updateAttendanceTable();
//     });

//     // Punch Out functionality
//     punchOutButton.addEventListener("click", function () {
//         const punchOutTime = new Date().toLocaleTimeString(); // Get current time
//         if (attendanceData[todayDate]) {
//             attendanceData[todayDate].punchOut = punchOutTime;
//             localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
//             punchOutButton.disabled = true;
//             punchInButton.disabled = false; // Enable punch in again for next day
//             updateAttendanceTable();
//         }
//     });

//     // Load existing attendance records
//     updateAttendanceTable();
// });




document.addEventListener("DOMContentLoaded", function() {
    const punchInButton = document.getElementById("punchInButton");
    const punchOutButton = document.getElementById("punchOutButton");
    const attendanceTableBody = document.getElementById("attendanceTable").querySelector("tbody");

    let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || { name: "John Doe", jobTitle: "Developer" };

    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Function to check if punch-in already exists for today
    function hasPunchedInToday() {
        return attendanceData.some(record => record.date === todayDate && record.punchIn !== null);
    }

    // Function to update the attendance table
    function updateAttendanceTable() {
        attendanceTableBody.innerHTML = ""; // Clear existing rows
        attendanceData.forEach(record => {
            const workingHours = record.punchOut ? calculateWorkingHours(record.punchIn, record.punchOut) : 'N/A';
            const row = `<tr>
                <td>${record.date}</td>
                <td>${record.employeeName}</td>
                <td>${record.jobTitle}</td>
                <td>${record.punchIn || 'N/A'}</td>
                <td>${record.punchOut || '---'}</td>
                <td>${workingHours}</td>
            </tr>`;
            attendanceTableBody.innerHTML += row;
        });
    }

    // Calculate working hours and minutes
    function calculateWorkingHours(punchInTime, punchOutTime) {
        const [punchInHours, punchInMinutes] = punchInTime.split(':').map(Number);
        const [punchOutHours, punchOutMinutes] = punchOutTime.split(':').map(Number);

        const punchInDate = new Date();
        punchInDate.setHours(punchInHours, punchInMinutes, 0);

        const punchOutDate = new Date();
        punchOutDate.setHours(punchOutHours, punchOutMinutes, 0);

        const diffInMs = punchOutDate - punchInDate; // Difference in milliseconds
        const totalMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to total minutes
        const hours = Math.floor(totalMinutes / 60); // Get whole hours
        const minutes = totalMinutes % 60; // Get remaining minutes

        return `${hours} H : ${minutes} m`;
    }

    // Punch In functionality
    punchInButton.addEventListener("click", function() {
        if (hasPunchedInToday()) {
            alert("You have already punched in today.");
            return;
        }
        const punchInTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get current time in 24-hour format
        const newRecord = {
            date: todayDate,
            employeeName: currentUser.name,
            jobTitle: currentUser.title,
            punchIn: punchInTime,
            punchOut: null
        };
        attendanceData.push(newRecord); // Add new record
        localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
        punchInButton.disabled = true;
        punchOutButton.disabled = false;
        updateAttendanceTable();
    });

    // Punch Out functionality
    punchOutButton.addEventListener("click", function() {
        const punchOutTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get current time in 24-hour format
        const todayRecord = attendanceData.find(record => record.date === todayDate);
        if (todayRecord && todayRecord.punchIn) {
            todayRecord.punchOut = punchOutTime;
            localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
            punchOutButton.disabled = true;
            updateAttendanceTable();
        }
    });

    // Disable Punch In if already punched in today
    if (hasPunchedInToday()) {
        punchInButton.disabled = true;
        punchOutButton.disabled = false;
    }

    // Load existing attendance records
    updateAttendanceTable();
});
