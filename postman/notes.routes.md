# Notes Routes

## Create Notes (Teacher/Admin)
```
http://localhost:8000/api/v1/lms/notes
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "title": "Introduction to React",
  "description": "Basics of JSX and Components",
  "url": "https://bucket.com/react-basics.pdf",
  "subject": "SUBJECT_ID"
}
```

---

## Get Notes
```
http://localhost:8000/api/v1/lms/notes
```
{GET}
*Requires JWT*
