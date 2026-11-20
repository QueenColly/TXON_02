const fs = require("fs").promises;
const path = require("path");

const studentsFilePath = path.join(__dirname, "../../data/students.json");

async function getAllStudents() {
    const data = await fs.readFile(studentsFilePath, "utf8");
    return JSON.parse(data);
}

async function addStudent(name) {
    const students = await getAllStudents();

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name
    };

    students.push(newStudent);

    await fs.writeFile(
        studentsFilePath,
        JSON.stringify(students, null, 4)
    );

    return newStudent;
}

module.exports = {
    getAllStudents,
    addStudent
};