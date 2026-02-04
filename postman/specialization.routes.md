# Specialization Routes

## Create Specialization (Admin)
```
http://localhost:8000/api/v1/lms/specialization
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Artificial Intelligence",
  "description": "AI and ML focus",
  "branch": "BRANCH_ID",
  "institution": "INSTITUTION_ID"
}
```

---

## Get All Specializations
```
http://localhost:8000/api/v1/lms/specialization
```
{GET}
*Requires JWT*

---

## Get Specialization By ID
```
http://localhost:8000/api/v1/lms/specialization/:id
```
{GET}
*Requires JWT*

---

## Update Specialization
```
http://localhost:8000/api/v1/lms/specialization/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "AI & Data Science"
}
```

---

## Delete Specialization
```
http://localhost:8000/api/v1/lms/specialization/:id
```
{DELETE}
*Requires JWT*
