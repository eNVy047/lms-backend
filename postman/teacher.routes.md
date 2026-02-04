# Teacher Routes

## Create Teacher Profile (Admin)
```
http://localhost:8000/api/v1/lms/teacher
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "fullName": "Prof. Alan Turing",
  "email": "alan@university.edu",
  "password": "SecurePassword123",
  "phone": { "countryCode": "+91", "number": "9876543210" },
  "institution": "INSTITUTION_ID",
  "employeeId": "EMP001",
  "department": "Computer Science",
  "designation": "Assistant Professor",
  "experience": 5,
  "qualifications": ["PhD in CS"],
  "joiningDate": "2024-01-01"
}
```

---

## Get All Teachers
```
http://localhost:8000/api/v1/lms/teacher
```
{GET}
*Requires JWT*

---

## Get Own Profile
```
http://localhost:8000/api/v1/lms/teacher/profile
```
{GET}
*Requires JWT*

---

## Get Teacher Profile By ID
```
http://localhost:8000/api/v1/lms/teacher/:id
```
{GET}
*Requires JWT*

---

## Update Teacher Profile
```
http://localhost:8000/api/v1/lms/teacher/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "department": "Information Technology",
  "designation": "Associate Professor"
}
```

---

## Delete Teacher Profile
```
http://localhost:8000/api/v1/lms/teacher/:id
```
{DELETE}
*Requires JWT*

---

## Get Assigned Courses
```
http://localhost:8000/api/v1/lms/teacher/assigned-courses
```
{GET}
*Requires JWT*

---

## Get Assigned Students
```
http://localhost:8000/api/v1/lms/teacher/assigned-students
```
{GET}
*Requires JWT*

---

## Bulk Upload Attendance
```
http://localhost:8000/api/v1/lms/teacher/attendance
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "courseId": "COURSE_ID",
  "subjectId": "SUBJECT_ID",
  "date": "2024-03-20",
  "attendanceData": [
    { "studentId": "S1", "status": "PRESENT" },
    { "studentId": "S2", "status": "ABSENT" }
  ]
}
```

---

## Bulk Upload Marks
```
http://localhost:8000/api/v1/lms/teacher/marks
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "courseId": "COURSE_ID",
  "semester": 1,
  "subjectId": "SUBJECT_ID",
  "examId": "EXAM_ID",
  "marksData": [
    { 
      "studentId": "STUDENT_ID_1", 
      "marksObtained": 85, 
      "totalMarks": 100, 
      "remarks": "Good" 
    },
    { 
      "studentId": "STUDENT_ID_2", 
      "marksObtained": 78, 
      "totalMarks": 100 
    }
  ]
}
```
