
jest.mock("../src/services/studentService");

const request = require("supertest");
const app = require("../src/app");
const studentService = require("../src/services/studentService");

describe("Student API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/students", () => {
        it("should retrieve all students", async () => {
            const students = [
                { id: 1, name: "Ada Johnson" },
                { id: 2, name: "Michael Brown" }
            ];

            studentService.getAllStudents.mockResolvedValue(students);

            const response = await request(app)
                .get("/api/students");

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.count).toBe(2);
            expect(response.body.data).toEqual(students);

            expect(studentService.getAllStudents).toHaveBeenCalledTimes(1);
        });
    });

    describe("POST /api/students", () => {
        it("should add a student successfully", async () => {
            const newStudent = {
                id: 3,
                name: "Chidera Umeh"
            };

            studentService.addStudent.mockResolvedValue(newStudent);

            const response = await request(app)
                .post("/api/students")
                .send({ name: "Chidera Umeh" });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toEqual(newStudent);

            expect(studentService.addStudent)
                .toHaveBeenCalledWith("Chidera Umeh");
        });

        it("should reject an empty student name", async () => {
            const response = await request(app)
                .post("/api/students")
                .send({ name: "" });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message)
                .toBe("Student name is required.");

            expect(studentService.addStudent).not.toHaveBeenCalled();
        });
    });
});
