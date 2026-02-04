# Timetable Settings Routes

## Create Timetable Settings (Admin)
```
http://localhost:8000/api/v1/lms/timetable-settings
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "General Timetable Policy",
  "workingDays": [1, 2, 3, 4, 5, 6],
  "startTime": "08:00 AM",
  "endTime": "04:00 PM",
  "periodDuration": 60,
  "periodsPerDay": 7,
  "breaks": [
    { "name": "Lunch Break", "startTime": "12:00 PM", "endTime": "01:00 PM" }
  ]
}
```

---

## Get Timetable Settings
```
http://localhost:8000/api/v1/lms/timetable-settings
```
{GET}
*Requires JWT*

---

## Update Timetable Settings (Admin)
```
http://localhost:8000/api/v1/lms/timetable-settings/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "periodDuration": 50
}
```

---

## Delete Timetable Settings (Admin)
```
http://localhost:8000/api/v1/lms/timetable-settings/:id
```
{DELETE}
*Requires JWT*
