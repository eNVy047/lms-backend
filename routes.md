# 📚 API Routes Documentation

**Base URL**: `http://localhost:8000/api/v1`

> **Note**: All routes except Authentication require a valid JWT Access Token in the `Authorization` header (`Bearer <token>`) or `accessToken` cookie.

---

## 🔐 Authentication & User
**Base Path**: `/user`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login user |
| `POST` | `/logout` | Logout user |
| `POST` | `/refresh-token` | Refresh access token |
| `POST` | `/change-password` | Change current password |
| `GET` | `/current-user` | Get logged-in user details |
| `PATCH` | `/update-account` | Update account details |
| `PATCH` | `/avatar` | Update user avatar |
| `POST` | `/forgot-password` | Request password reset |
| `POST` | `/reset-password/:resetToken` | Reset password |

---

## 🎓 LMS Module
**Base Path**: `/lms`

### 🏫 Institution & Setup

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/institution` | Create a new Institution (University/School) |
| `GET` | `/institution` | Get all institutions |
| `GET` | `/institution/:id` | Get institution by ID |
| `PATCH` | `/institution/:id` | Update institution details |
| `DELETE` | `/institution/:id` | Delete institution |
| `POST` | `/institution-setup` | Save setup details (Certificates, Bank Info) |
| `POST` | `/institution-setup/register-address` | Register university address (Step 1) |
| `POST` | `/institution-setup/verify-contact` | Verify contact details (Step 2) |
| `GET` | `/institution-setup/:institutionId` | Get setup details for an institution |
| `PATCH` | `/institution-setup/:id` | Update setup details |
| `POST` | `/branch` | Create a new Branch |
| `GET` | `/branch` | Get all branches |
| `GET` | `/branch/:id` | Get branch by ID |

### 👥 Students & Teachers

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/student` | Create Student Profile |
| `GET` | `/student` | Get all students |
| `GET` | `/student/profile` | Get **current** logged-in student profile |
| `GET` | `/student/:id` | Get student profile by ID |
| `PATCH` | `/student/:id` | Update student profile |
| `DELETE` | `/student/:id` | Delete student (Admin) |
| `POST` | `/student/register-course` | Register for valid course |
| `GET` | `/student/:studentId/attendance` | View attendance |
| `GET` | `/student/:studentId/marks` | View academic results |
| `POST` | `/student/:studentId/pay-fees` | Pay fees |
| `POST` | `/teacher` | Create Teacher Profile |
| `GET` | `/teacher` | Get all teachers |
| `GET` | `/teacher/profile` | Get **current** logged-in teacher profile |
| `GET` | `/teacher/:id` | Get teacher profile by ID |
| `PATCH` | `/teacher/:id` | Update teacher profile |
| `DELETE` | `/teacher/:id` | Delete teacher (Admin) |
| `GET` | `/teacher/assigned-courses` | Get assigned courses/subjects |
| `GET` | `/teacher/assigned-students` | Get students for assigned course |
| `POST` | `/teacher/attendance` | Bulk upload attendance |
| `POST` | `/teacher/marks` | Bulk upload marks |

### 📚 Academic Structure

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/courses` | Create a new Course |
| `GET` | `/courses` | Get all courses |
| `GET` | `/courses/:id` | Get course by ID |
| `PATCH` | `/courses/:id` | Update course |
| `DELETE` | `/courses/:id` | Delete course |
| `POST` | `/subjects` | Create a new Subject |
| `GET` | `/subjects` | Get subjects (supports filters) |
| `GET` | `/subjects/:id` | Get subject by ID |
| `POST` | `/enrolled-courses` | Enroll a user in a course |
| `GET` | `/enrolled-courses/user/:userId?` | Get enrollments for user (defaults to self) |
| `DELETE` | `/enrolled-courses/:id` | Remove enrollment |

### �️ Admin & Reporting

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/admin/assign-faculty` | Assign faculty to course/subject |
| `GET` | `/admin/reports?type=...` | Generate reports (PERF, ENROLL, FEES, ATTENDANCE) |

### 📊 Exams & Results

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/exams` | Create Exam |
| `GET` | `/exams` | List Exams |
| `PATCH` | `/exams/:id/publish` | Publish Exam Results |
| `POST` | `/academic-records` | Enter Marks (Teacher) |
| `GET` | `/academic-records/student/:studentId` | View Results |
| `PATCH` | `/academic-records/:id` | Update Marks (Re-evaluation) |

### 📅 Attendance & Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/attendance/mark` | Mark Attendance (Bulk) |
| `GET` | `/attendance/report` | Attendance Reports |
| `POST` | `/transport/routes` | Create Transport Route |
| `GET` | `/transport/routes` | List Transport Routes |
| `POST` | `/transport/vehicles` | Add Vehicle |
| `POST` | `/library/assets` | Add Library Asset |
| `GET` | `/library/assets` | Search Library Inventory |
| `POST` | `/library/issue` | Issue Book |
| `POST` | `/library/return/:transactionId` | Return Book |
| `POST` | `/payroll/generate` | Generate Payroll (Admin) |
| `GET` | `/payroll` | View Payroll (Admin/Employee) |

### 🎓 Scholarships

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/scholarship/schemes` | Create Scholarship Scheme |
| `GET` | `/scholarship/schemes` | List Schemes |
| `POST` | `/scholarship/apply` | Apply for Scholarship |
| `PATCH` | `/scholarship/application/:id/process` | Approve/Reject Application |

### �📝 Content & Assessment

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/assignment` | Create an Assignment |
| `GET` | `/assignment` | Get all assignments |
| `POST` | `/assignment/submit` | **Submit** an assignment (Student) |
| `GET` | `/assignment/:id` | Get assignment details |
| `POST` | `/notes` | Upload Notes |
| `GET` | `/notes` | Get notes |
| `POST` | `/video` | Upload Video |
| `GET` | `/video` | Get videos |
| `POST` | `/quizz` | Create a Quiz |
| `GET` | `/quizz` | Get quizzes |
| `POST` | `/result` | Create/Record a Result |
| `GET` | `/result` | Get results |

### 📢 Engagement & Operations

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/announcement` | Create Announcement |
| `GET` | `/announcement` | Get announcements |
| `POST` | `/event` | Create Event |
| `GET` | `/event` | Get events |
| `POST` | `/comment` | Add a comment to a post |
| `GET` | `/comment/post/:postId` | Get comments for a post |
| `POST` | `/like` | Toggle like on post/comment |
| `POST` | `/fees` | Create Fee record |
| `GET` | `/fees` | Get fee records |
| `GET` | `/fees/statistics` | Get fee statistics |
| `GET` | `/fees/student/:studentId` | Get fees for specific student |
| `POST` | `/fees/:feeId/pay` | Process Full Payment |
| `POST` | `/fees/:feeId/installment/:installmentNumber/pay` | Process Installment Payment |

---

### 🧪 Quick Postman Copy-Paste
*Copy these suffixes and append to `http://localhost:8000/api/v1`* (Note: Auth routes use `/user`, LMS routes use `/lms`)

```text
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
/fees/student/:studentId
/fees/:feeId/pay (POST)
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
```
