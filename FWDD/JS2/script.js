// ==========================================
// Student Result Management System
// Part 1
// ==========================================

// Array to store all student objects
let students = [];

// Calculate Grade
function calculateGrade(marks) {

    if (marks >= 80) {
        return "A";
    }
    else if (marks >= 70) {
        return "B";
    }
    else if (marks >= 60) {
        return "C";
    }
    else if (marks >= 40) {
        return "D";
    }
    else {
        return "F";
    }

}

// Calculate Pass / Fail
function calculateResult(marks) {

    if (marks >= 40) {
        return "PASS";
    }
    else {
        return "FAIL";
    }

}

// Add Student
function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let subject = document.getElementById("subject").value;
    let marks = Number(document.getElementById("marks").value);

    // Validation
    if (name == "" || roll == "" || subject == "" || isNaN(marks)) {
        alert("Please fill all fields.");
        return;
    }

    // Check duplicate Roll Number
    for (let i = 0; i < students.length; i++) {

        if (students[i].roll == roll) {
            alert("Roll Number already exists.");
            return;
        }

    }

    // Create Student Object
    let student = {

        name: name,
        roll: roll,
        subject: subject,
        marks: marks,
        grade: calculateGrade(marks),
        result: calculateResult(marks)

    };

    // Store in Array
    students.push(student);

    // Update Table
    displayStudents();

    // Update Statistics
    updateStatistics();

    // Clear Form
    document.getElementById("studentForm").reset();

}

// Display Student Records
function displayStudents() {

    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        tableBody.innerHTML +=
        "<tr>" +
        "<td>" + students[i].name + "</td>" +
        "<td>" + students[i].roll + "</td>" +
        "<td>" + students[i].subject + "</td>" +
        "<td>" + students[i].marks + "</td>" +
        "<td>" + students[i].grade + "</td>" +
        "<td>" + students[i].result + "</td>" +
        "</tr>";

    }

}

// ==========================================
// Student Result Management System
// Part 2
// ==========================================

// Update Statistics
function updateStatistics() {

    // Total Students
    document.getElementById("totalStudents").innerHTML = students.length;

    // No students
    if (students.length == 0) {

        document.getElementById("averageMarks").innerHTML = 0;
        document.getElementById("highestStudent").innerHTML = "None";
        return;

    }

    // Calculate Average Marks
    let totalMarks = 0;

    for (let i = 0; i < students.length; i++) {

        totalMarks += students[i].marks;

    }

    let average = totalMarks / students.length;

    document.getElementById("averageMarks").innerHTML =
    average.toFixed(2);

    // Find Highest Marks Student

    let highest = students[0];

    for (let i = 1; i < students.length; i++) {

        if (students[i].marks > highest.marks) {

            highest = students[i];

        }

    }

    document.getElementById("highestStudent").innerHTML =
    highest.name + " (" + highest.marks + ")";

}



// Search Student
function searchStudent() {

    let roll = document.getElementById("searchRoll").value;

    let found = false;

    for (let i = 0; i < students.length; i++) {

        if (students[i].roll == roll) {

            document.getElementById("searchResult").innerHTML =
            "Name: " + students[i].name +
            "<br>Subject: " + students[i].subject +
            "<br>Marks: " + students[i].marks +
            "<br>Grade: " + students[i].grade +
            "<br>Result: " + students[i].result;

            found = true;

            break;

        }

    }

    if (found == false) {

        document.getElementById("searchResult").innerHTML =
        "Student not found.";

    }

}



// Delete Student
function deleteStudent() {

    let roll = document.getElementById("deleteRoll").value;

    let found = false;

    for (let i = 0; i < students.length; i++) {

        if (students[i].roll == roll) {

            students.splice(i, 1);

            found = true;

            break;

        }

    }

    if (found) {

        alert("Student deleted successfully.");

        displayStudents();

        updateStatistics();

        document.getElementById("searchResult").innerHTML = "";

    }
    else {

        alert("Student not found.");

    }

}
// ==========================================
// Student Result Management System
// Part 3
// ==========================================


// Display Current Date
function showDate() {

    let today = new Date();

    document.getElementById("currentDate").innerHTML =
    today.toDateString();

}



// Display Live Time
function showTime() {

    let now = new Date();

    document.getElementById("currentTime").innerHTML =
    now.toLocaleTimeString();

}



// Display Screen Information
function showScreenInfo() {

    document.getElementById("screenWidth").innerHTML =
    window.innerWidth;

    document.getElementById("screenHeight").innerHTML =
    window.innerHeight;

    document.getElementById("pageURL").innerHTML =
    window.location.href;

}



// Dark Mode
function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}



// Welcome Message
function showWelcome() {

    document.getElementById("welcome").innerHTML =
    "Welcome to Student Result Management System!";

}



// ==========================================
// Run Automatically When Page Loads
// ==========================================

// Show current date
showDate();

// Show current time immediately
showTime();

// Update time every second
setInterval(showTime, 1000);

// Display screen information
showScreenInfo();

// Display welcome message after 3 seconds
setTimeout(showWelcome, 3000);