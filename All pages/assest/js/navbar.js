document.addEventListener("DOMContentLoaded", () => {
  // Check the login status on page load
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";


  checkLoginStatus(isLoggedIn);

  // if there are any masseges, disply them
  if (localStorage.message) {
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");

    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    document.getElementById("message").innerText = localStorage.message;
    localStorage.removeItem("message");
    toastBootstrap.show();
  }
  // Retrieve and log user information if available
  if (localStorage.usersData && localStorage.userEmail) {
    let user = JSON.parse(localStorage.usersData).find(
      (user) => user.email === localStorage.userEmail
    );
  }
});

function checkLoginStatus(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById("service").style.display = "block";
    document.getElementById("services").style.display = "block";
    document.getElementById("profile-info").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("logout").style.display = "block";

    const userRole = localStorage.getItem("userRole");
    // Check if user is HR
    if (userRole === "hr") {
      // Show dashboard for HR users
      setDisplayByClass("hr", "block");
      setDisplayByClass("employee", "none");
      setDisplayByClass("manager", "none");
    } else if (userRole === "manager") {

      setDisplayByClass("hr", "none");
      setDisplayByClass("employee", "none");
      setDisplayByClass("manager", "block");
    }
    else {
      setDisplayByClass("hr", "none");
      setDisplayByClass("employee", "block");
      setDisplayByClass("manager", "none");
    }


  } else {
    let services = document.getElementById("service");
    if (services) document.getElementById("service").parentElement.remove();
    document.getElementById("services").parentElement.remove();
    document.getElementById("profile-info").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("logout").style.display = "none";
  }
}

function setDisplayByClass(className, displayStyle) {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = displayStyle;
  }
}

function logout() {
  // Simulate a logout process without deleting user data
  localStorage.setItem("loggedIn", "false");
  checkLoginStatus(false);
  window.location.href = "/HR-Management-System/index.html";
}
let logoutBtn = document.getElementById("logout");
if (logoutBtn) logoutBtn.addEventListener("click", logout);





//////////////////////////////////////////////////////////////////////////////////////////////////

