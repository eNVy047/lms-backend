# Courses Routes

## Create Course (Admin)
```
http://localhost:8000/api/v1/lms/courses
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Bachelor of Technology",
  "institution": "INSTITUTION_ID",
  "branches": [
    {
      "name": "Computer Science",
      "specializations": [
        { "name": "AI" },
        { "name": "Cloud Computing" }
      ]
    }
  ]
}
```

---

## Get All Courses
```
http://localhost:8000/api/v1/lms/courses
```
{GET}
*Requires JWT*

---

## Get Course By ID
```
http://localhost:8000/api/v1/lms/courses/:id
```
{GET}
*Requires JWT*

---

## Update Course
```
http://localhost:8000/api/v1/lms/courses/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "B.Tech (Honors)"
}
```

---

## Delete Course
```
http://localhost:8000/api/v1/lms/courses/:id
```
{DELETE}
*Requires JWT*
