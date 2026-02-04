# Timetable Routes

## Create Timetable Entry (Admin)
```
http://localhost:8000/api/v1/lms/timetable
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "course": "COURSE_ID",
  "branch": "BRANCH_ID",
  "semester": 1,
  "section": "SECTION_ID",
  "batch": "2023-2027",
  "dayOfWeek": "Monday",
  "startTime": "09:00 AM",
  "endTime": "10:00 AM",
  "periodNumber": 1,
  "subject": "SUBJECT_ID",
  "teacher": "TEACHER_ID",
  "roomNumber": "Room 101"
}
```

---

## Get Timetable
```
http://localhost:8000/api/v1/lms/timetable
```
{GET}
*Requires JWT*

---

## Get Timetable Entry By ID
```
http://localhost:8000/api/v1/lms/timetable/:id
```
{GET}
*Requires JWT*

---

## Update Timetable Entry (Admin)
```
http://localhost:8000/api/v1/lms/timetable/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "startTime": "09:30 AM"
}
```

---

## Delete Timetable Entry (Admin)
```
http://localhost:8000/api/v1/lms/timetable/:id
```
{DELETE}
*Requires JWT*
