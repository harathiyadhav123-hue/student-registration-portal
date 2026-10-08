let registrationForm = document.getElementById("registrationForm");
let errorMessage = document.getElementById("errorMessage");
let successMessage = document.getElementById("successMessage");
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    errorMessage.classList.add("hidden");
    successMessage.classList.add("hidden");
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let qualification = document.getElementById("qualification").value;
    let studentClass = document.getElementById("studentClass").value.trim();
    let subject = document.getElementById("subject").value.trim();
    let marks = document.getElementById("marks").value;
    let genderElement = document.querySelector(
        'input[name="gender"]:checked'
    );
    if (genderElement === null) {
        errorMessage.textContent = "Please select your gender.";
        errorMessage.classList.remove("hidden");
        return;
    }
    let gender = genderElement.value;
    let interestElements = document.querySelectorAll(
        'input[name="interests"]:checked'
    );
    let interests = [];
    interestElements.forEach(function(item) {
        interests.push(item.value);
    });
    let aadhaarFile = document.getElementById("aadhaar").files[0];
    if (aadhaarFile === undefined) {
        errorMessage.textContent = "Please upload your Aadhaar PDF.";
        errorMessage.classList.remove("hidden");
        return;
    }
    if (aadhaarFile.type !== "application/pdf") {
        errorMessage.textContent = "Aadhaar document must be a PDF.";
        errorMessage.classList.remove("hidden");
        return;
    }
    let students = getStudents();
    let emailExists = students.some(function(student) {
        return student.email.toLowerCase() === email.toLowerCase();
    });
    if (emailExists) {
        errorMessage.textContent =
            "This email is already registered.";
        errorMessage.classList.remove("hidden");
        return;
    }
    let id = 1;
    if (students.length > 0) {
        id = students[students.length - 1].id + 1;
    }
    convertFileToBase64(aadhaarFile, function(fileData) {
        let student = {
            id: id,
            name: name,
            email: email,
            password: password,
            dob: dob,
            gender: gender,
            qualification: qualification,
            interests: interests,
            studentClass: studentClass,
            subject: subject,
            marks: marks,
            aadhaar: fileData
        };
        students.push(student);
        saveStudents(students);
        successMessage.textContent =
            "Registration successful. Redirecting to login...";
        successMessage.classList.remove("hidden");
        registrationForm.reset();
        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);
    });
});
