function getStudents() {
    let students = localStorage.getItem("students");
    if (students === null) {
        return [];
    }
    return JSON.parse(students);
}
function saveStudents(students) {
    localStorage.setItem("students", JSON.stringify(students));
}
function convertFileToBase64(file, callback) {
    let reader = new FileReader();
    reader.onload = function() {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}
