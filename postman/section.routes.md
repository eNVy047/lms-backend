# Section Routes

## Create Section (Admin)
```
http://localhost:8000/api/v1/lms/section
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Section A",
  "course": "COURSE_ID",
  "branch": "BRANCH_ID",
  "semester": 1,
  "batch": "2023-2027",
  "capacity": 60
}
```

---

## Get All Sections
```
http://localhost:8000/api/v1/lms/section
```
{GET}
*Requires JWT*

---

## Get Section By ID
```
http://localhost:8000/api/v1/lms/section/:id
```
{GET}
*Requires JWT*

---

## Update Section
```
http://localhost:8000/api/v1/lms/section/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Section A Updated",
  "capacity": 70,
  "semester": 2,
  "batch": "2023-2027"
}
```

---

## Delete Section
```
http://localhost:8000/api/v1/lms/section/:id
```
{DELETE}
*Requires JWT*
