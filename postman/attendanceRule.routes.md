# Attendance Rule Routes

## Create Attendance Rule (Admin)
```
http://localhost:8000/api/v1/lms/attendance-rules
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "75% Attendance Policy",
  "targetRole": "STUDENT",
  "minAttendancePercentage": 75,
  "workingDays": [1, 2, 3, 4, 5, 6],
  "lateGracePeriodMinutes": 15,
  "penaltyRules": {
    "lateForAbsentCount": 3,
    "deductFromLeave": false
  },
  "sessionStartTime": "09:00",
  "sessionEndTime": "17:00"
}
```

---

## Get All Attendance Rules
```
http://localhost:8000/api/v1/lms/attendance-rules
```
{GET}
*Requires JWT*

---

## Update Attendance Rule (Admin)
```
http://localhost:8000/api/v1/lms/attendance-rules/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "minAttendancePercentage": 80
}
```

---

## Delete Attendance Rule (Admin)
```
http://localhost:8000/api/v1/lms/attendance-rules/:id
```
{DELETE}
*Requires JWT*
