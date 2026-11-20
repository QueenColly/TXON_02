
const studentList = document.getElementById("student-list");
const studentCount = document.getElementById("student-count");
const studentForm = document.getElementById("student-form");
const studentNameInput = document.getElementById("student-name");
const formMessage = document.getElementById("form-message");
const addButton = document.getElementById("add-button");

const API_URL = "/api/students";

// Display students on the page
function displayStudents(students) {
    studentList.innerHTML = "";

    studentCount.textContent =
        `${students.length} ${students.length === 1 ? "Student" : "Students"}`;

    if (students.length === 0) {
        studentList.textContent = "No students found.";
        return;
    }

    students.forEach((student) => {
        const studentCard = document.createElement("div");
        studentCard.classList.add("student-card");

        const studentNumber = document.createElement("div");
        studentNumber.classList.add("student-number");
        studentNumber.textContent = student.id;

        const studentDetails = document.createElement("div");

        const studentName = document.createElement("h3");
        studentName.textContent = student.name;

        const studentId = document.createElement("p");
        studentId.textContent = `Student ID: ${student.id}`;

        studentDetails.append(studentName, studentId);
        studentCard.append(studentNumber, studentDetails);
        studentList.appendChild(studentCard);
    });
}

// Retrieve students from the backend
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to retrieve students.");
        }

        const result = await response.json();

        displayStudents(result.data);
    } catch (error) {
        studentList.textContent = error.message;
    }
}

// Add a new student
studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = studentNameInput.value.trim();

    if (!name) {
        showMessage("Please enter a student name.", "error");
        return;
    }

    addButton.disabled = true;
    addButton.textContent = "Adding...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to add student.");
        }

        studentForm.reset();

        showMessage(result.message, "success");

        await fetchStudents();

    } catch (error) {
        showMessage(error.message, "error");
    } finally {
        addButton.disabled = false;
        addButton.textContent = "Add Student";
    }
});

// Display feedback messages
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
}

// Load students when the page opens
fetchStudents();

