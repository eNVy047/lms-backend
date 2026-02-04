# Scholarship Routes

## Create Scholarship Scheme (Admin)
```
http://localhost:8000/api/v1/lms/scholarship/schemes
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Merit Scholarship 2024",
  "type": "ACADEMIC",
  "provider": "University",
  "description": "For students with >90% marks",
  "amountType": "FIXED",
  "value": 5000
}
```

---

## Apply For Scholarship (Student/Admin)
```
http://localhost:8000/api/v1/lms/scholarship/apply
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "scholarship": "SCHOLARSHIP_ID",
  "student": "STUDENT_ID",
  "documents": [
    { "name": "Marksheet", "url": "https://bucket.com/marksheet.pdf" }
  ]
}
```

---

## Process Scholarship Application (Admin)
```
http://localhost:8000/api/v1/lms/scholarship/application/:applicationId/process
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "status": "APPROVED",
  "remarks": "Verified and approved"
}
```
