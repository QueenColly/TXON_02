# TXON Week 2 – Student Directory API

A JSON-based Student Directory application built as part of the TXON Full Stack Development Internship.

## Project Overview

This project provides a simple student directory where users can view existing student records and add new students through a web interface.

The backend is built with Node.js and Express, while student records are stored in a local JSON file without using a database.

## Features

- Retrieve all students through a REST API.
- Add new students through the API.
- Automatically generate unique student IDs.
- Persist student records in a JSON file.
- Validate incoming student names.
- Display student records dynamically using JavaScript Fetch API.
- Update the student list without refreshing the page.
- Automated API tests using Jest and Supertest.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Jest
- Supertest
- JSON file storage

## Project Structure

```text
TXON_02/
├── data/
│   └── students.json
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── src/
│   ├── controllers/
│   │   └── studentController.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── services/
│   │   └── studentService.js
│   └── app.js
├── tests/
│   └── studentRoutes.test.js
├── server.js
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/QueenColly/TXON_02.git
cd TXON_02
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Visit:

http://localhost:3000

## API Documentation

### GET /api/students

Retrieves all student records.

Example:

```bash
curl http://localhost:3000/api/students
```

### POST /api/students

Adds a new student.

Example:

```bash
curl -X POST http://localhost:3000/api/students \
-H "Content-Type: application/json" \
-d '{"name":"Grace Okonkwo"}'
```

Successful response:

```json
{
  "success": true,
  "message": "Student added successfully.",
  "data": {
    "id": 5,
    "name": "Grace Okonkwo"
  }
}
```

### Validation

Student names are required. An empty name returns HTTP 400.

## Running Tests

Run the automated test suite:

```bash
npm test
```

The tests cover:

- Retrieving student records.
- Adding a student successfully.
- Rejecting an empty student name.

## Data Storage

Student records are stored in `data/students.json`.

No external database is required.

## Internship

**Program:** TXON Full Stack Development Internship  
**Task:** Week 2 – JSON-Based Student Directory API  
**Developer:** Collete Umeh

## License

This project is licensed under the ISC License.