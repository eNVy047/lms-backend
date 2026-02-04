# Attendance Routes

## Mark Attendance (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/attendance/mark
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "course": "COURSE_ID",
  "semester": 1,
  "section": "A",
  "subject": "SUBJECT_ID",
  "date": "2024-03-20",
  "attendanceData": [
    { "studentId": "STUDENT_ID_1", "status": "PRESENT", "remarks": "On time" },
    { "studentId": "STUDENT_ID_2", "status": "ABSENT", "remarks": "Late" }
  ]
}
```

---

## Get Attendance Report
```
http://localhost:8000/api/v1/lms/attendance/report
```
{GET}
*Requires JWT*

### 🔍 Query Parameters
- `studentId`: Filter by student
- `subjectId`: Filter by subject
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)
