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

// Function to populate form with user data
function populateForm(user) {
  if (!user) return;

  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editPhone").value = user.phone;
  document.getElementById("editAddress").value = user.address;
  document.getElementById("editCountry").value = user.country;
  document.getElementById("editCity").value = user.city;
  document.getElementById("editJobTitle").value = user.title;
  document.getElementById("editEmploymentType").value = user.employmentType;
}

// Function to save changes
function saveChanges(e) {
  e.preventDefault(); // Prevent form from submitting traditionally

  const role = localStorage.getItem("userRole");
  if (!role) return;

  // Update the user's data
  usersData[role] = {
    ...usersData[role],
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phone: document.getElementById("editPhone").value,
    address: document.getElementById("editAddress").value,
    country: document.getElementById("editCountry").value,
    city: document.getElementById("editCity").value,
    title: document.getElementById("editJobTitle").value,
    employmentType: document.getElementById("editEmploymentType").value,
  };

  // Optionally, save to localStorage or send to server
  localStorage.setItem("usersData", JSON.stringify(usersData));
  alert("Profile updated successfully!");
}

// Load the profile form when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  const user = getLoggedInUserData(); // Fetch the logged-in user's data
  populateForm(user); // Populate the form with the data

  // Handle form submission
  document.getElementById("editProfileForm").addEventListener("submit", saveChanges);
});
