# Attendence-App

1. Frontend (React)

Teacher Login Page
Teacher enters credentials → React sends a POST /api/auth/login request to backend.
If valid → backend returns a JWT token → React stores it in localStorage.

Student List Page
React sends GET /api/students request with JWT in headers.
Backend validates token → returns student list from MongoDB → React displays students with toggle buttons (Present/Absent).

Attendance Submission
Teacher marks students → React sends POST /api/attendance with student attendance data → backend saves in MongoDB.

Attendance Summary Page
React sends GET /api/attendance/summary → backend calculates % attendance from database → React displays chart (Recharts/Chart.js).

2. Backend (Node + Express)

Receives API requests from frontend.

Verifies JWT tokens (for protected routes).

Handles CRUD:

POST /api/auth/login → validate user

GET /api/students → fetch student list

POST /api/attendance → save attendance

GET /api/attendance/summary → send summary data

3. Database (MongoDB + Mongoose)

Stores:

Teachers collection

Students collection

Attendance collection

Mongoose handles schema and queries.
# Student Attendance Dashboard (MERN)

A clean MERN app where teachers log in, mark attendance for their class, and view a dynamic summary chart. Uses JWT auth (dummy teacher), reusable UI components, RESTful APIs, MongoDB (with seed script), and Recharts.

---

## Project Structure

```
attendance-app/
├─ backend/
│  ├─ package.json
│  ├─ .env.example
│  ├─ server.js
│  ├─ config/
│  │  └─ db.js
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ models/
│  │  ├─ Student.js
│  │  └─ Attendance.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ students.js
│  │  └─ attendance.js
│  └─ seed/
│     └─ seed.js
└─ frontend/
   ├─ package.json
   ├─ vite.config.js
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ styles.css
      ├─ api/axios.js
      ├─ utils/token.js
      ├─ context/AuthContext.jsx
      ├─ components/
      │  ├─ Button.jsx
      │  ├─ Input.jsx
      │  ├─ Card.jsx
      │  ├─ Table.jsx
      │  ├─ Toggle.jsx
      │  ├─ Navbar.jsx
      │  └─ ProtectedRoute.jsx
      └─ pages/
         ├─ Login.jsx
         ├─ StudentList.jsx
         ├─ Summary.jsx
         └─ NotFound.jsx
```

---

