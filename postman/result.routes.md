# Result Routes

## Create Result (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/result
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "student": "STUDENT_ID",
  "institution": "INSTITUTION_ID",
  "contentId": "QUIZZ_OR_EXAM_ID",
  "contentType": "Exam",
  "resultType": "MID_TERM",
  "score": 88,
  "totalScore": 100,
  "isPublished": true,
  "grade": "A"
}
```

---

## Get Results
```
http://localhost:8000/api/v1/lms/result
```
{GET}
*Requires JWT*
