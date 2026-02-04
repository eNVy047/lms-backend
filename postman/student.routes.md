# Student Routes

## Create Student (Admin Only)
```
http://localhost:8000/api/v1/lms/student
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "Password123",
  "enrollmentNumber": "EN12345",
  "rollNumber": "RN001",
  "institution": "INSTITUTION_ID",
  "course": "COURSE_ID",
  "branch": "BRANCH_ID",
  "batch": "2023-2027",
  "currentSemester": 1,
  "guardianPhone": {
    "countryCode": "+91",
    "number": "9087654321"
  },
  "isHosteler": false,
  "isTransportUser": true,
  "transportRoute": "ROUTE_ID"
}
```

---

## Get All Students (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/student
```
{GET}
*Requires JWT*

---

## Get Own Profile
```
http://localhost:8000/api/v1/lms/student/profile
```
{GET}
*Requires JWT*

---

## Get Student By ID
```
http://localhost:8000/api/v1/lms/student/:id
```
{GET}
*Requires JWT*

---

## Update Student Profile
```
http://localhost:8000/api/v1/lms/student/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "currentSemester": 2,
  "section": "A"
}
```

---

## Delete Student
```
http://localhost:8000/api/v1/lms/student/:id
```
{DELETE}
*Requires JWT*

---

## Register Course
```
http://localhost:8000/api/v1/lms/student/register-course
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "studentId": "STUDENT_ID",
  "courseId": "COURSE_ID",
  "branch": "BRANCH_ID",
  "semester": 1
}
```

---

## View Attendance
```
http://localhost:8000/api/v1/lms/student/:studentId/attendance
```
{GET}
*Requires JWT*

---

## View Marks
```
http://localhost:8000/api/v1/lms/student/:studentId/marks
```
{GET}
*Requires JWT*

---

## Pay Fees
```
http://localhost:8000/api/v1/lms/student/:studentId/pay-fees
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "feeId": "FEE_ID",
  "amount": 5000,
  "transactionId": "TXN12345",
  "installmentNumber": 1
}
```
