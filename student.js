let studentId = localStorage.getItem("loggedInStudentId");
let students = getStudents();
let student = students.find(function(item) {
    return item.id === Number(studentId);
});
if (student === undefined) {
    window.location.href = "login.html";
}
function displayStudent() {
    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + student.name + " (User ID: #" + student.id + ")";
    document.getElementById("studentName").textContent =
        student.name;
    document.getElementById("studentEmail").textContent =
        student.email;
    document.getElementById("studentDob").textContent =
        student.dob;
    document.getElementById("studentGender").textContent =
        student.gender;
    document.getElementById("studentQualification").textContent =
        student.qualification;
    document.getElementById("studentInterests").textContent =
        student.interests.join(", ");
    document.getElementById("studentClass").textContent =
        student.studentClass;
    document.getElementById("studentSubject").textContent =
        student.subject;
    document.getElementById("studentMarks").textContent =
        student.marks;
    document.getElementById("aadhaarLink").href =
        student.aadhaar;
}
displayStudent();
let editProfileButton =
    document.getElementById("editProfileButton");
let editProfileSection =
    document.getElementById("editProfileSection");
let cancelEditButton =
    document.getElementById("cancelEditButton");
editProfileButton.addEventListener("click", function() {
    editProfileSection.classList.remove("hidden");
    document.getElementById("editName").value =
        student.name;
    document.getElementById("editEmail").value =
        student.email;
    document.getElementById("editDob").value =
        student.dob;
    document.getElementById("editQualification").value =
        student.qualification;
    document.getElementById("editClass").value =
        student.studentClass;
    document.getElementById("editSubject").value =
        student.subject;
    document.getElementById("editMarks").value =
        student.marks;
    let genderButtons =
        document.querySelectorAll('input[name="editGender"]');
    genderButtons.forEach(function(button) {
        if (button.value === student.gender) {
            button.checked = true;
        }
    });
    let interestButtons =
        document.querySelectorAll('input[name="editInterests"]');
    interestButtons.forEach(function(button) {
        if (student.interests.includes(button.value)) {
            button.checked = true;
        } else {
            button.checked = false;
        }
    });
});
cancelEditButton.addEventListener("click", function() {
    editProfileSection.classList.add("hidden");
});
let editProfileForm =
    document.getElementById("editProfileForm");
let editErrorMessage =
    document.getElementById("editErrorMessage");
editProfileForm.addEventListener("submit", function(event) {
    event.preventDefault();
    editErrorMessage.classList.add("hidden");
    let name =
        document.getElementById("editName").value.trim();
    let dob =
        document.getElementById("editDob").value;
    let qualification =
        document.getElementById("editQualification").value;
    let studentClass =
        document.getElementById("editClass").value.trim();
    let subject =
        document.getElementById("editSubject").value.trim();
    let marks =
        document.getElementById("editMarks").value;
    let genderElement =
        document.querySelector('input[name="editGender"]:checked');
    if (genderElement === null) {
        editErrorMessage.textContent =
            "Please select your gender.";
        editErrorMessage.classList.remove("hidden");
        return;
    }
    let gender = genderElement.value;
    let interestElements =
        document.querySelectorAll('input[name="editInterests"]:checked');
    let interests = [];
    interestElements.forEach(function(item) {
        interests.push(item.value);
    });
    let aadhaarFile =
        document.getElementById("editAadhaar").files[0];
    student.name = name;
    student.dob = dob;
    student.gender = gender;
    student.qualification = qualification;
    student.interests = interests;
    student.studentClass = studentClass;
    student.subject = subject;
    student.marks = marks;
    if (aadhaarFile !== undefined) {
        if (aadhaarFile.type !== "application/pdf") {
            editErrorMessage.textContent =
                "Aadhaar document must be a PDF.";
            editErrorMessage.classList.remove("hidden");
            return;
        }
        convertFileToBase64(aadhaarFile, function(fileData) {
            student.aadhaar = fileData;
            saveStudents(students);
            displayStudent();
            editProfileSection.classList.add("hidden");
            editProfileForm.reset();
        });
    } else {
        saveStudents(students);
        displayStudent();
        editProfileSection.classList.add("hidden");
        editProfileForm.reset();
    }
});
