# Branch Routes

## Create Branch (Admin)
```
http://localhost:8000/api/v1/lms/branch
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Computer Science and Engineering",
  "description": "Department of CSE",
  "branchHead": {
    "name": "Dr. Smith",
    "phone": {
      "countryCode": "+91",
      "number": "9999888877"
    }
  },
  "course": "COURSE_ID",
  "owner": "INSTITUTION_ID"
}
```

---

## Get All Branches
```
http://localhost:8000/api/v1/lms/branch
```
{GET}
*Requires JWT*

---

## Get Branch By ID
```
http://localhost:8000/api/v1/lms/branch/:id
```
{GET}
*Requires JWT*

---

## Update Branch
```
http://localhost:8000/api/v1/lms/branch/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "CSE Updated"
}
```

---

## Delete Branch
```
http://localhost:8000/api/v1/lms/branch/:id
```
{DELETE}
*Requires JWT*
