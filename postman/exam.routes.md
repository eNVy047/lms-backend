# Exam Routes

## Create Exam (Admin)
```
http://localhost:8000/api/v1/lms/exams
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Mid-Term Spring 2024",
  "examType": "Mid-Term",
  "course": "COURSE_ID",
  "semester": 1,
  "date": "2024-05-10T10:00:00.000Z"
}
```

---

## Get All Exams
```
http://localhost:8000/api/v1/lms/exams
```
{GET}
*Requires JWT*

---

## Publish Exam (Admin)
```
http://localhost:8000/api/v1/lms/exams/:id/publish
```
{PATCH}
*Requires JWT*
