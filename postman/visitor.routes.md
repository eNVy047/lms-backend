# Visitor Routes

## Log Visitor Entry (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/visitor
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Robert Smith",
  "phone": "9876543210",
  "purpose": "Meeting with Principal",
  "whomToMeet": "USER_ID_OF_PRINCIPAL",
  "idType": "AADHAAR",
  "idNumber": "1234-5678-9012"
}
```

---

## Get Visitors
```
http://localhost:8000/api/v1/lms/visitor
```
{GET}
*Requires JWT*

---

## Log Visitor Exit
```
http://localhost:8000/api/v1/lms/visitor/:id/exit
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "status": "OUT"
}
```
