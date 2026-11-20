const studentService = require("../services/studentService");

async function getAllStudents(req, res) {
    try {
        const students = await studentService.getAllStudents();

        return res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to retrieve students."
        });
    }
}

async function addStudent(req, res) {
    try {
        const { name } = req.body;

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Student name is required."
            });
        }

        const newStudent = await studentService.addStudent(name.trim());

        return res.status(201).json({
            success: true,
            message: "Student added successfully.",
            data: newStudent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to add student."
        });
    }
}

module.exports = {
    getAllStudents,
    addStudent
};