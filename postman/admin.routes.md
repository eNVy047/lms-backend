# Admin Routes

## Assign Faculty
```
http://localhost:8000/api/v1/lms/admin/assign-faculty
```
{POST}
*Requires JWT (Admin Only)*

### 📦 Request Body (JSON)
```json
{
  "teacherId": "TEACHER_ID",
  "courseId": "COURSE_ID",
  "branch": "BRANCH_ID",
  "semester": 1,
  "section": "A",
  "subjectId": "SUBJECT_ID"
}
```

---

## Generate Reports
```
http://localhost:8000/api/v1/lms/admin/reports
```
{GET}
*Requires JWT (Admin Only)*
