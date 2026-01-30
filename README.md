# 📚 API Routes Documentation

**Base URL**: `http://localhost:8000/api/v1`

---

## 🔐 Authentication

# Register User

```
http://localhost:8000/api/v1/user/register
```

### 📦 Request Body (JSON)

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "role": "USER",
  "password": "StrongPassword@123",
  "address": "123 Main Street, New Delhi, India",
  "phone": {
    "code": "+91",
    "number": "9876543210"
  }
}
```

# Login User

```
http://localhost:8000/api/v1/user/login
```

### 📦 Request Body (JSON)

```json
{
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "StrongPassword@123"
}
```

# Logout User

```
http://localhost:8000/api/v1/user/logout
```

# Refresh Token

```
http://localhost:8000/api/v1/user/refresh-token
```

# Change Password

```
http://localhost:8000/api/v1/user/change-password
```

### 📦 Request Body (JSON)

```json
{
  "oldPassword": "OldPassword@123",
  "newPassword": "NewStrongPassword@123"
}
```

# Get Current User

```
http://localhost:8000/api/v1/user/current-user
```

# Update Account Details

```
http://localhost:8000/api/v1/user/update-account
```

### 📦 Request Body (JSON)

```json
{
  "fullName": "John Updated Doe",
  "email": "john.updated@example.com"
}
```

# Update Avatar (Multipart)

```
PATCH http://localhost:8000/api/v1/user/avatar
```

# Forgot Password

```
http://localhost:8000/api/v1/user/forgot-password
```

### 📦 Request Body (JSON)

```json
{
  "email": "john.doe@example.com"
}
```

# Reset Password

```
http://localhost:8000/api/v1/user/reset-password/:resetToken
```

### 📦 Request Body (JSON)

```json
{
  "newPassword": "ResetPassword@123"
}
```

---

## 🏫 Institution & Setup

# Create Institution

```
http://localhost:8000/api/v1/lms/institution
```

### 📦 Request Body (JSON)

```json
{
  "name": "Delhi Public School",
  "affiliationNumber": "CBSE123456",
  "email": "admin@dps.com",
  "domain": "dps.edu.in",
  "phoneNumber": "9876543210",
  "address": "Mathura Road, New Delhi",
  "institutionType": "School",
  "logo": "https://cloudinary.com/url-to-logo.png"
}
```

# Step 1: Register University Address

```
http://localhost:8000/api/v1/lms/institution-setup/register-address
```

### 📦 Request Body (JSON)

```json
{
  "universityName": "Delhi University",
  "addressLine1": "North Campus",
  "city": "Delhi",
  "pincode": "110007",
  "country": "India"
}
```

# Step 2: Contact Verification

```
http://localhost:8000/api/v1/lms/institution-setup/verify-contact
```

### 📦 Request Body (JSON)

```json
{
    "email": "admin@univ.edu",
    "phone": "9999999999"
}
```

# Create Branch

```
http://localhost:8000/api/v1/lms/branch
```

### � Request Body (JSON)

```json
{
  "name": "Science Block",
  "institution": "65b8c9d8123abc456def7890",
  "address": "Wing A, North Campus",
  "contactNumber": "011-23456789"
}
```

---

## 👥 User Profiles

# Create Student Profile

```
http://localhost:8000/api/v1/lms/student
```

### 📦 Request Body (JSON)

```json
{
  "userId": "65b8c9d8123abc456def7890",
  "institution": "65b8c9d8123abc456def7891",
  "enrollmentNumber": "2024001",
  "rollNumber": "101",
  "department": "Computer Science",
  "batch": "2024-2028",
  "currentSemester": 1,
  "section": "A",
  "guardianName": "Jane Doe",
  "guardianPhone": "9876543211"
}
```

# Student: Register for Course

```
http://localhost:8000/api/v1/lms/student/register-course
```

### 📦 Request Body (JSON)

```json
{
  "courseId": "65b8c9d8123abc456def7893",
  "semester": 1,
  "academicYear": "2024-2025"
}
```

# Student: Pay Fees

```
http://localhost:8000/api/v1/lms/student/:studentId/pay-fees
```

### 📦 Request Body (JSON)

```json
{
  "amount": 15000,
  "feeId": "65b8c9d8123abc456def7899",
  "paymentMethod": "RAZORPAY",
  "transactionId": "pay_Hj89734nnsd"
}
```

# Get Student Profile (Self)

```
http://localhost:8000/api/v1/lms/student/profile
```

# Get Student by ID

```
http://localhost:8000/api/v1/lms/student/:id
```

# Get Student Attendance

```
http://localhost:8000/api/v1/lms/student/:studentId/attendance
```

# Get Student Marks

```
http://localhost:8000/api/v1/lms/student/:studentId/marks
```

# Delete Student (Admin)

```
DELETE http://localhost:8000/api/v1/lms/student/:id
```

# Create Teacher Profile

```
http://localhost:8000/api/v1/lms/teacher
```

### 📦 Request Body (JSON)

```json
{
  "userId": "65b8c9d8123abc456def7892",
  "institution": "65b8c9d8123abc456def7891",
  "employeeId": "TCH-001",
  "department": "Physics",
  "designation": "Assistant Professor",
  "qualifications": ["PhD", "MSc"],
  "experience": 5,
  "specializations": ["Quantum Physics", "Optics"]
}
```

# Teacher: Bulk Upload Attendance

```
http://localhost:8000/api/v1/lms/teacher/attendance
```

### 📦 Request Body (JSON)

```json
{
  "courseId": "65b8c9d8123abc456def7893",
  "sem": 1,
  "subjectId": "65b8c9d8123abc456def7895",
  "date": "2024-03-20",
  "attendanceData": [
    { "studentId": "65b8c9d8123abc456def7894", "status": "PRESENT" },
    { "studentId": "65b8c9d8123abc456def7900", "status": "ABSENT" }
  ]
}
```

# Teacher: Bulk Upload Marks

```
http://localhost:8000/api/v1/lms/teacher/marks
```

### 📦 Request Body (JSON)

```json
{
  "courseId": "65b8c9d8123abc456def7893",
  "subjectId": "65b8c9d8123abc456def7895",
  "examId": "65b8c9d8123abc456def7922",
  "marksData": [
    { "studentId": "65b8c9d8123abc456def7894", "marksObtained": 85 },
    { "studentId": "65b8c9d8123abc456def7900", "marksObtained": 92 }
  ]
}
```

# Get Teacher Profile (Self)

```
http://localhost:8000/api/v1/lms/teacher/profile
```

# Get Teacher by ID

```
http://localhost:8000/api/v1/lms/teacher/:id
```

# Get Teacher Assigned Courses

```
http://localhost:8000/api/v1/lms/teacher/assigned-courses
```

# Get Teacher Assigned Students

```
http://localhost:8000/api/v1/lms/teacher/assigned-students?courseId=ID&semester=1
```

# Delete Teacher (Admin)

```
DELETE http://localhost:8000/api/v1/lms/teacher/:id
```

---

## 📚 Academic

# Create Course

```
http://localhost:8000/api/v1/lms/courses
```

### 📦 Request Body (JSON)

```json
{
  "title": "Introduction to Computer Science",
  "code": "CS101",
  "description": "Basic concepts of programming",
  "credits": 4,
  "department": "Computer Science",
  "semester": 1,
  "institution": "65b8c9d8123abc456def7891"
}
```

# Create Subject

```
http://localhost:8000/api/v1/lms/subjects
```

### 📦 Request Body (JSON)

```json
{
  "name": "Data Structures",
  "code": "CS201",
  "course": "65b8c9d8123abc456def7893",
  "semester": 2,
  "credits": 3,
  "description": "Study of arrays, lists, trees",
  "institution": "65b8c9d8123abc456def7891"
}
```

# Enroll Student in Course

```
http://localhost:8000/api/v1/lms/enrolled-courses
```

### � Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "course": "65b8c9d8123abc456def7893",
  "semester": 1,
  "academicYear": "2024-2025"
}
```

# Get All Courses

```
http://localhost:8000/api/v1/lms/courses
```

# Get Course by ID

```
http://localhost:8000/api/v1/lms/courses/:id
```

# Delete Course

```
DELETE http://localhost:8000/api/v1/lms/courses/:id
```

# Get Subjects (Supports filters)

```
http://localhost:8000/api/v1/lms/subjects?courseId=ID&semester=1
```

# Get Subject by ID

```
http://localhost:8000/api/v1/lms/subjects/:id
```

# Get Enrollments (User)

```
http://localhost:8000/api/v1/lms/enrolled-courses/user/:userId
```

# Remove Enrollment

```
DELETE http://localhost:8000/api/v1/lms/enrolled-courses/:id
```

---

## 📝 Content & Assessment

# Create Assignment

```
http://localhost:8000/api/v1/lms/assignment
```

### � Request Body (JSON)

```json
{
  "title": "Recursion Practice",
  "content": "Solve the attached problems using recursion.",
  "subject": "65b8c9d8123abc456def7895",
  "course": "65b8c9d8123abc456def7893",
  "dueDate": "2024-02-15T23:59:00.000Z",
  "totalMarks": 20
}
```

# Submit Assignment

```
http://localhost:8000/api/v1/lms/submitted-assignment
```

### 📦 Request Body (JSON)

```json
{
  "assignment": "65b8c9d8123abc456def7896",
  "content": "Here is my submission...",
  "document": {
      "url": "https://cloudinary.com/my-homework.pdf",
      "localPath": "/tmp/my-homework.pdf"
  }
}
```

# Upload Notes

```
http://localhost:8000/api/v1/lms/notes
```

### 📦 Request Body (JSON)

```json
{
  "title": "Chapter 1: Introduction",
  "subjectId": "65b8c9d8123abc456def7895",
  "fileUrl": "https://cloudinary.com/notes.pdf",
  "description": "Lecture notes for week 1"
}
```

# Upload Video

```
http://localhost:8000/api/v1/lms/video
```

### 📦 Request Body (JSON)

```json
{
  "title": "Lecture 1 Recording",
  "subjectId": "65b8c9d8123abc456def7895",
  "videoUrl": "https://cloudinary.com/lec1.mp4",
  "duration": 3600
}
```

# Get All Assignments

```
http://localhost:8000/api/v1/lms/assignment
```

# Get Assignment Details

```
http://localhost:8000/api/v1/lms/assignment/:id
```

# Delete Assignment

```
DELETE http://localhost:8000/api/v1/lms/assignment/:id
```

# Get Quizzes

```
http://localhost:8000/api/v1/lms/quizz
```

# Create Quiz

```
http://localhost:8000/api/v1/lms/quizz
```

### � Request Body (JSON)

```json
{
  "title": "Logic Gates Quiz",
  "subject": "65b8c9d8123abc456def7895",
  "questions": [
    {
      "question": "What is the output of AND gate if inputs are 1 and 0?",
      "options": ["0", "1", "High", "Low"],
      "correctOption": 0,
      "marks": 1
    }
  ],
  "duration": 30,
  "totalMarks": 10
}
```

# Record Result

```
http://localhost:8000/api/v1/lms/result
```

### � Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "examType": "Mid-Term",
  "subject": "65b8c9d8123abc456def7895",
  "marksObtained": 45,
  "totalMarks": 50
}
```

---

## 📢 Operations

# Create Announcement

```
http://localhost:8000/api/v1/lms/announcement
```

### 📦 Request Body (JSON)

```json
{
  "title": "Holiday Notice",
  "content": "School will remain closed on Friday.",
  "type": "General",
  "targetAudience": ["Student", "Teacher"],
  "institution": "65b8c9d8123abc456def7891"
}
```

# Create Event

```
http://localhost:8000/api/v1/lms/event
```

### 📦 Request Body (JSON)

```json
{
  "title": "Annual Sports Day",
  "description": "Join us for track and field events.",
  "startDate": "2024-03-10T09:00:00.000Z",
  "endDate": "2024-03-10T17:00:00.000Z",
  "location": "Main Ground",
  "organizer": "Sports Department"
}
```

# Pay Fees

```
http://localhost:8000/api/v1/lms/fees
```

### 📦 Request Body (JSON)

```json
{
  "student": "65b8c9d8123abc456def7894",
  "amount": 50000,
  "currency": "INR",
  "type": "Tuition",
  "dueDate": "2024-04-01T23:59:00.000Z",
  "paymentMethod": "RAZORPAY",
  "transactionId": "pay_1234567890"
}
```

# Get Fee Statistics

```
http://localhost:8000/api/v1/lms/fees/statistics
```

---

## 🛡️ Admin & Reporting

# Admin: Assign Faculty

```
http://localhost:8000/api/v1/lms/admin/assign-faculty
```

### 📦 Request Body (JSON)

```json
{
  "teacherId": "65b8c9d8123abc456def7892",
  "courseId": "65b8c9d8123abc456def7893",
  "subjectId": "65b8c9d8123abc456def7895",
  "semester": 1,
  "section": "A",
  "branch": "Computer Science"
}
```

# Admin: Generate Reports

```
http://localhost:8000/api/v1/lms/admin/reports?type=FEES&institutionId=65b8c9d8123abc456def7891
```

---

## 📊 Exams & Results

# Create Exam

```
http://localhost:8000/api/v1/lms/exams
```

### 📦 Request Body (JSON)

```json
{
  "title": "End Semester Exam - 2024",
  "type": "THEORY",
  "date": "2024-05-15T09:00:00.000Z",
  "duration": 180,
  "totalMarks": 100,
  "course": "65b8c9d8123abc456def7893",
  "subject": "65b8c9d8123abc456def7895"
}
```

# Publish Results

```
http://localhost:8000/api/v1/lms/exams/:examId/publish
```

### 📦 Request Body (JSON)

```json
{
  "isPublished": true
}
```

# List Exams

```
http://localhost:8000/api/v1/lms/exams
```

# Get Student Results (By Student ID)

```
http://localhost:8000/api/v1/lms/academic-records/student/:studentId
```

---

## 📅 Attendance & Operations

# Mark Attendance (Bulk)

```
http://localhost:8000/api/v1/lms/attendance/mark
```

### 📦 Request Body (JSON)

```json
{
  "courseId": "65b8c9d8123abc456def7893",
  "subjectId": "65b8c9d8123abc456def7895",
  "date": "2024-04-10",
  "records": [
    { "student": "65b8c9d8123abc456def7894", "status": "PRESENT" },
    { "student": "65b8c9d8123abc456def7901", "status": "ABSENT" }
  ]
}
```

# Create Transport Route

```
http://localhost:8000/api/v1/lms/transport/routes
```

### 📦 Request Body (JSON)

```json
{
  "routeName": "Route 5 - South City",
  "vehicleNumber": "DL-1C-5678",
  "driverName": "Rajesh Kumar",
  "stops": ["Sector 45", "Sector 30", "Main Campus"],
  "timing": "07:30 AM"
}
```

# Issue Library Book

```
http://localhost:8000/api/v1/lms/library/issue
```

### 📦 Request Body (JSON)

```json
{
  "bookId": "65b8c9d8123abc456def8001",
  "studentId": "65b8c9d8123abc456def7894",
  "dueDate": "2024-04-25"
}
```

# Generate Payroll

```
http://localhost:8000/api/v1/lms/payroll/generate
```

### 📦 Request Body (JSON)

```json
{
  "month": 3,
  "year": 2024,
  "teacherId": "65b8c9d8123abc456def7892"
}
```

---

## 🎓 Scholarships

# Create Scholarship Scheme

```
http://localhost:8000/api/v1/lms/scholarship/schemes
```

### 📦 Request Body (JSON)
```json
{
  "name": "Merit Scholarship 2024",
  "criteria": "CGPA > 9.0",
  "amount": 25000,
  "description": "For academic excellence"
}
```

# Apply for Scholarship

```
http://localhost:8000/api/v1/lms/scholarship/apply
```

### 📦 Request Body (JSON)
```json
{
  "schemeId": "65b8c9d8123abc456def9001",
  "studentId": "65b8c9d8123abc456def7894",
  "documents": ["https://cloudinary.com/marksheet.pdf"]
}
```

---

## 💬 Engagement & Social

# Add Comment

```
http://localhost:8000/api/v1/lms/comment
```

### 📦 Request Body (JSON)

```json
{
  "content": "This assignment is very helpful, thank you!",
  "postId": "65b8c9d8123abc456def7777"
}
```

# Get Comments for Post

```
http://localhost:8000/api/v1/lms/comment/post/:postId
```

# Toggle Like

```
http://localhost:8000/api/v1/lms/like
```

### 📦 Request Body (JSON)

```json
{
  "postId": "65b8c9d8123abc456def7777",
  "commentId": "65b8c9d8123abc456def8888"
}
```

---

### 🧪 Quick Postman Copy-Paste
*Append these to `http://localhost:8000/api/v1/lms`*

```text
/auth/register (POST)
/auth/login (POST)
/institution
/institution-setup
/student
/student/profile
/student/register-course (POST)
/teacher
/teacher/profile
/teacher/assigned-courses
/courses
/subjects
/enrolled-courses
/assignment
/assignment/submit
/notes
/video
/quizz
/result
/announcement
/event
/fees
/fees/statistics
/admin/assign-faculty
/admin/reports
/exams
/academic-records
/attendance/mark
/library/assets
/library/issue
/transport/routes
/scholarship/schemes
/payroll/generate
/comment
/like
```
