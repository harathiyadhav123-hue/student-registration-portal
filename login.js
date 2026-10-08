let loginForm = document.getElementById("loginForm");
let errorMessage = document.getElementById("errorMessage");
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    email = email.trim();
    if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("loginType", "admin");
        window.location.href = "admin-dashboard.html";
        return;
    }
    let students = getStudents();
    let student = students.find(function(item) {
        return item.email === email && item.password === password;
    });
    if (student) {
        localStorage.setItem("loggedInStudentId", student.id);
        localStorage.setItem("loginType", "student");
        window.location.href = "student-dashboard.html";
    } else {
        errorMessage.textContent = "Invalid email or password.";
        errorMessage.classList.remove("hidden");
    }
});
let forgotPassword = document.getElementById("forgotPassword");
forgotPassword.addEventListener("click", function() {
    let email = document.getElementById("email").value.trim();
    if (email === "") {
        errorMessage.textContent = "Please enter your email first.";
        errorMessage.classList.remove("hidden");
        return;
    }
    let students = getStudents();
    let student = students.find(function(item) {
        return item.email === email;
    });
    if (student) {
        errorMessage.textContent =
            "Your password is: " + student.password;
        errorMessage.classList.remove("hidden");
    } else {
        errorMessage.textContent =
            "Email is not registered.";
        errorMessage.classList.remove("hidden");
    }
});
