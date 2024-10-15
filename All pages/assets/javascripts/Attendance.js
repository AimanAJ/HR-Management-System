document.addEventListener("DOMContentLoaded", function() {
    const punchInButton = document.getElementById("punchInButton");
    const punchOutButton = document.getElementById("punchOutButton");
    const attendanceTableBody = document.getElementById("attendanceTable").querySelector("tbody");

    // Retrieve the attendance data from local storage, or create a new object if it doesn't exist
    let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || {};
 
    
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(currentUser);
    // Check if currentUser is available
    if (!currentUser) {
        console.error("User data not found in local storage. Please set the lookedInUser object.");
        return; // Stop execution if user data is not available
    }

    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Function to update the attendance table
    function updateAttendanceTable() {
        attendanceTableBody.innerHTML = ""; // Clear existing rows
        for (const date in attendanceData) {
            const record = attendanceData[date];
            const row = `<tr>
                <td>${date}</td>
                <td>${record.employeeName}</td>
                <td>${record.jobTitle}</td>
                <td>${record.punchIn || 'N/A'}</td>
                <td>${record.punchOut || 'N/A'}</td>
            </tr>`;
            attendanceTableBody.innerHTML += row;
        }
    }

    // Punch In functionality
    punchInButton.addEventListener("click", function() {
        const punchInTime = new Date().toLocaleTimeString(); // Get current time
        
        // Check if the user has already punched in today
        if (!attendanceData[todayDate] || !attendanceData[todayDate].punchIn) {
            attendanceData[todayDate] = {
                employeeName: currentUser.name,
                jobTitle: currentUser.title,
                punchIn: punchInTime,
                punchOut: null
            };
            localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
            punchInButton.disabled = true; // Disable Punch In button
            punchOutButton.disabled = false; // Enable Punch Out button
            updateAttendanceTable();
        } else {
            alert("You have already punched in for today.");
        }
    });

    // Punch Out functionality
    punchOutButton.addEventListener("click", function() {
        const punchOutTime = new Date().toLocaleTimeString(); // Get current time
        if (attendanceData[todayDate]) {
            if (!attendanceData[todayDate].punchOut) {
                attendanceData[todayDate].punchOut = punchOutTime;
                localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
                punchOutButton.disabled = true; // Disable Punch Out button
                updateAttendanceTable();
            } else {
                alert("You have already punched out for today.");
            }
        }
    });

    // Load existing attendance records
    updateAttendanceTable();
});
