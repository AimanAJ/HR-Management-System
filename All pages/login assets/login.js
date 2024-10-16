// const loginForm = document.querySelector("#login-form");
// const emailInput = document.querySelector("#email");
// const passwordInput = document.querySelector("#password");
// const rememberMeCheckbox = document.querySelector(".remember-forgot input");

// // Check if user credentials are stored in localStorage
// window.addEventListener("DOMContentLoaded", (event) => {
//   if (localStorage.getItem("rememberMe") === "true") {
//     emailInput.value = localStorage.getItem("userEmail") || "";
//     passwordInput.value = localStorage.getItem("userPassword") || "";
//     rememberMeCheckbox.checked = true;
//   }
// });

// loginForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent page reload

//   const userEmail = emailInput.value;
//   const userPassword =   (passwordInput.value);

//   const users = JSON.parse(localStorage.getItem("usersData"));

//   if (users) {
//     const isValidUser = users.filter((user) => user.email == userEmail);

//     if (isValidUser.length) {
//       if (isValidUser[0].password == userPassword) {
//         let loggedInUser = isValidUser[0];

//         if (rememberMeCheckbox.checked) {
//           localStorage.setItem("rememberMe", "true");
//           localStorage.setItem("userEmail", userEmail);
//           localStorage.setItem("userPassword", passwordInput.value); // Store decrypted password
//         } else {
//           localStorage.removeItem("rememberMe");
//           localStorage.removeItem("userEmail");
//           localStorage.removeItem("userPassword");
//         }

//         // Set loggedIn status to true upon successful login
//         localStorage.setItem("loggedIn", "true");
//         localStorage.setItem("userEmail", userEmail); // Store user email for later retrieval
//         localStorage.setItem(
//           "message",
//           `Hello, ${loggedInUser.userName}! Welcome here!`
//         );

//         // Proceed with successful login actions here
//         // delete loggedInUser.password;
//         localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
//         window.location.href = "../../index.html";
//       } else {
//         document.querySelector(".login-error").innerText =
//           " Please check your email, password or both";
//       }
//     } else {
//       document.querySelector(".login-error").innerText =
//         "User not found, please check your email or register to continue";
//     }
//   } else {
//   }
// });

// // Logout function
// function logout() {
//   localStorage.removeItem("loggedIn");
//   localStorage.removeItem("loggedInUser");
//   window.location.href = "login.html"; // Redirect to login page
// }


const loginForm = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const rememberMeCheckbox = document.querySelector(".remember-forgot input");

// Sample user data with updated fields (name, email, password, role, phone number, address, country, city)
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
    title: "HR ",
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

// Check if user credentials are stored in localStorage
window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("rememberMe") === "true") {
    emailInput.value = localStorage.getItem("userEmail") || "";
    passwordInput.value = localStorage.getItem("userPassword") || "";
    rememberMeCheckbox.checked = true;
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const userEmail = emailInput.value.trim();
  const userPassword = passwordInput.value.trim();

  // Convert usersData object to an array of user objects for easy filtering
  const users = Object.values(usersData);

  // Validate user credentials
  const isValidUser = users.find(user => user.email === userEmail && user.password === userPassword);

  if (isValidUser) {
    let loggedInUser = { ...isValidUser }; // Clone user data

    if (rememberMeCheckbox.checked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userPassword", userPassword); // Store decrypted password
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPassword");
    }

    // Set loggedIn status to true upon successful login
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", userEmail); // Store user email for later retrieval
    localStorage.setItem(
      "message",
      `Hello, ${loggedInUser.name}! Welcome here!`
    );

    // Store the user role in local storage
    localStorage.setItem("userRole", loggedInUser.role); // Store role based on user type

    // Store full user info in local storage, excluding password
    delete loggedInUser.password; // Remove password from the logged-in user object
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Redirect to your main page
    window.location.href = "/HR-Management-System/index.html";
  } else {
    document.querySelector(".login-error").innerText =
      "Please check your email, password, or both.";
  }
});

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userRole"); // Remove user role on logout
  window.location.href = "/HR-Management-System/login.html"; // Redirect to login page
}
