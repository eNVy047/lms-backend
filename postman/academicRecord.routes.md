# Academic Record Routes

## Add Marks (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/academic-records
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "student": "STUDENT_ID",
  "exam": "EXAM_ID",
  "subject": "SUBJECT_ID",
  "marksObtained": 85,
  "totalMarks": 100,
  "grade": "A",
  "remarks": "Excellent performance"
}
```

---

## Get Student Results
```
http://localhost:8000/api/v1/lms/academic-records/student/:studentId
```
{GET}
*Requires JWT*

---

## Update Marks (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/academic-records/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "newMarks": 90,
  "reason": "Re-evaluation"
}
```
