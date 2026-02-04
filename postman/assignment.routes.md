# Assignment Routes

## Create Assignment (Teacher/Admin)
```
http://localhost:8000/api/v1/lms/assignment
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "title": "Data Structures Assignment 1",
  "content": "Implement a Linked List in C++",
  "document": ["https://bucket.com/assignment1.pdf"]
}
```

---

## Get All Assignments
```
http://localhost:8000/api/v1/lms/assignment
```
{GET}
*Requires JWT*

---

## Submit Assignment (Student)
```
http://localhost:8000/api/v1/lms/assignment/submit
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "assignmentId": "ASSIGNMENT_ID",
  "title": "My Submission",
  "content": "Here is my submission: https://github.com/user/repo",
  "document": [
    { "url": "https://bucket.com/solution.pdf", "localPath": "/tmp/solution.pdf" }
  ]
}
```

---

## Get Assignment By ID
```
http://localhost:8000/api/v1/lms/assignment/:id
```
{GET}
*Requires JWT*
