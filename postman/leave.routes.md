# Leave Routes

## Apply Leave (Student/Teacher)
```
http://localhost:8000/api/v1/lms/leave/apply
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "leaveType": "SICK",
  "startDate": "2024-04-01",
  "endDate": "2024-04-03",
  "reason": "Fever and cold"
}
```

---

## Get My Leaves
```
http://localhost:8000/api/v1/lms/leave/apply
```
{GET}
*Requires JWT*

---

## Get All Leave Requests (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/leave/requests
```
{GET}
*Requires JWT*

---

## Update Leave Status (Admin)
```
http://localhost:8000/api/v1/lms/leave/:id/status
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "status": "APPROVED",
  "comment": "Get well soon"
}
```
