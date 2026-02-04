# Hostel Routes

## Create Hostel (Admin)
```
http://localhost:8000/api/v1/lms/hostel
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Men's Hostel A",
  "address": "North Campus",
  "capacity": 200,
  "type": "BOYS",
  "warden": "WARDEN_USER_ID"
}
```

---

## Get All Hostels
```
http://localhost:8000/api/v1/lms/hostel
```
{GET}
*Requires JWT*

---

## Create Room (Admin)
```
http://localhost:8000/api/v1/lms/hostel/rooms
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "hostel": "HOSTEL_ID",
  "roomNumber": "A-101",
  "roomType": "DOUBLE",
  "capacity": 2,
  "pricePerSemester": 15000
}
```

---

## Get Rooms
```
http://localhost:8000/api/v1/lms/hostel/rooms
```
{GET}
*Requires JWT*

---

## Allot Room (Admin)
```
http://localhost:8000/api/v1/lms/hostel/allot
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "student": "STUDENT_ID",
  "room": "ROOM_ID"
}
```
