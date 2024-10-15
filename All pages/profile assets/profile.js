// async function loadProfile() {
//   try {
//     // حاول الحصول على البيانات من localStorage
//     const storedData = localStorage.getItem("profileData");

//     let user;
//     if (storedData) {
//       // إذا كانت البيانات موجودة، قم بتحميلها من localStorage
//       user = JSON.parse(storedData);
//     } else {
//       // إذا لم تكن البيانات موجودة، قم بتحميلها من users.json
//       const response = await fetch("profile assets/users.json");
//       const data = await response.json();

//       // ابحث عن المستخدم الذي حسابه HR وقم بتخزين بياناته في localStorage
//       for (let i = 0; i < data.users.length; i++) {
//         const currentUser = data.users[i];
//         if (currentUser.account.is_hr) {
//           user = currentUser;
//           localStorage.setItem("profileData", JSON.stringify(user));
//           break;
//         }
//       }
//     }

//     if (user) {
//       updateProfile(user);
//     }
//   } catch (error) {
//     console.error("Error loading profile data:", error);
//   }
// }

// function updateProfile(user) {
//   // استرجاع المعلومات من local storage
//   const loggedInUser = localStorage.getItem("loggedInUser");

//   // تحويل النص إلى كائن JSON
//   const userObject = JSON.parse(loggedInUser);

//   // الوصول إلى البيانات
//   // const userName = userObject.userName;
//   // const email = userObject.email;

//   document.getElementById("first_name").innerText = userObject.userName;
//   document.getElementById("profileEmail").innerText = userObject.email;

//   // document.getElementById('profilePhoto').src = user.personal_information.img;
//   // document.getElementById('profilePicture').src = user.personal_information.img;
//   document.getElementById("profileId").innerText = user.personal_information.id;
//   document.getElementById("profilePhone").innerText =
//     user.personal_information.phone;
//   document.getElementById("profileAddress").innerText =
//     user.personal_information.address;
//   document.getElementById("profileCountry").innerText =
//     user.personal_information.country;
//   document.getElementById("profileCity").innerText =
//     user.personal_information.city;

//   const educationContainer = document.getElementById("profileEducation");
//   educationContainer.innerHTML = "";

//   user.education.reverse().forEach((edu) => {
//     const eduDiv = document.createElement("div");
//     eduDiv.innerHTML = `<span>${edu.date}</span><p>${edu.description}</p>`;
//     educationContainer.appendChild(eduDiv);
//   });

//   document.getElementById("jobTitle").innerText = user.job.job_title;
//   document.getElementById("jobTitle1").innerText = user.job.job_title;
//   document.getElementById("department").innerText = user.job.department;
//   document.getElementById("department1").innerText = user.job.department;
//   document.getElementById("employeeType").innerText = user.job.employee_type;
//   document.getElementById("employeeType1").innerText = user.job.employee_type;
//   document.getElementById("startDate").innerText = user.job.start_date;
//   document.getElementById("contractEndDate").innerText =
//     user.job.contract_end_date;
//   document.getElementById("lineManager").innerText = user.job.line_manager;
// }

// // استرجاع المعلومات من local storage
// const loggedInUser = localStorage.getItem("loggedInUser");

// if (loggedInUser) {
//   const userObject = JSON.parse(loggedInUser);

//   const userName = userObject.userName;
//   const email = userObject.email;

//   document.getElementById("first_name").innerText = userObject.userName;
//   document.getElementById("profileEmail").innerText = userObject.email;
// }

// // تنفيذ تحميل الملف
// loadProfile();


// Sample users data

const usersData = {
  hr: {
    name: "Raghad Alyan",
    email: "Raghad@orange.com",
    password: "hrpassword",
    role: "hr",
    phone: "123456789",
    address: "123 HR St",
    country: "Jordan",
    city: "Amman",
    title: "HR Manager",
    employmentType: "Full-time",
  },
  employee: {
    name: "Ayman Aljaradat",
    email: "Ayman@orange.com",
    password: "emppassword",
    role: "employee",
    phone: "987654321",
    address: "456 Emp St",
    country: "Jordan",
    city: "Irbid",
    title: "Software Developer",
    employmentType: "Full-time",
  },
  manager: {
    name: "Mohammed Frehat",
    email: "Mohammed@orange.com",
    password: "managerpassword",
    role: "manager",
    phone: "555666777",
    address: "789 Manager St",
    country: "Jordan",
    city: "Ajloun",
    title: "Project Manager",
    employmentType: "Full-time",
  }
};

// Function to get the current logged-in user's data based on role
function getLoggedInUserData() {
  const role = localStorage.getItem("userRole"); // Get role from localStorage
  return role ? usersData[role] : null; // Return user data or null if not found
}

// Function to display user data in the profile page
function displayUserProfile(user) {
  if (!user) return;
debugger
  document.getElementById("first_name").innerText = user.name;
  document.getElementById("profileEmail").innerText = user.email;
  document.getElementById("profilePhone").innerText = user.phone;
  document.getElementById("profileAddress").innerText = user.address;
  document.getElementById("profileCountry").innerText = user.country;
  document.getElementById("profileCity").innerText = user.city;
  document.getElementById("jobTitle").innerText = user.title;
  document.getElementById("employeeType").innerText = user.employmentType;
  document.getElementById("department").innerText = getDepartmentByRole(user.role); // Optional logic for department based on role
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Optional helper function to define department by role
function getDepartmentByRole(role) {
  const departments = {
    hr: "Human Resources",
    employee: "Training",
    manager: "Management"
  };
  return departments[role] || "General";
}

// Load the profile when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  const user = getLoggedInUserData(); // Fetch the logged-in user's data
  displayUserProfile(user); // Display the profile
});
