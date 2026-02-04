# Subjects Routes

## Create Subject (Admin)
```
http://localhost:8000/api/v1/lms/subjects
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Data Structures",
  "code": "CS101",
  "course": "COURSE_ID",
  "institution": "INSTITUTION_ID",
  "semester": 1,
  "credits": 4,
  "branch": "BRANCH_ID"
}
```

---

## Get All Subjects
```
http://localhost:8000/api/v1/lms/subjects
```
{GET}
*Requires JWT*

---

## Get Subject By ID
```
http://localhost:8000/api/v1/lms/subjects/:id
```
{GET}
*Requires JWT*

---

## Update Subject
```
http://localhost:8000/api/v1/lms/subjects/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Advanced Data Structures",
  "credits": 5
}
```

---

## Delete Subject
```
http://localhost:8000/api/v1/lms/subjects/:id
```
{DELETE}
*Requires JWT*
