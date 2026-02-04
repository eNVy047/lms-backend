# Quizz Routes

## Create Quizz (Teacher/Admin)
```
http://localhost:8000/api/v1/lms/quizz
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "title": "History of Computing",
  "description": "Basic quiz on computer evolution.",
  "subject": "SUBJECT_ID",
  "totalMarks": 50,
  "duration": 30,
  "questions": [
    {
      "question": "Who is the father of computers?",
      "options": ["Charles Babbage", "Alan Turing"],
      "correctOption": 0
    }
  ]
}
```

---

## Get Quizzes
```
http://localhost:8000/api/v1/lms/quizz
```
{GET}
*Requires JWT*
