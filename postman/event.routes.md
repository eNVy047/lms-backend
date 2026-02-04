# Event Routes

## Create Event (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/event
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "title": "Annual Sports Meet",
  "description": "Annual sports day for all departments.",
  "date": "2024-12-10T09:00:00.000Z",
  "venue": "Main Stadium",
  "image": "https://bucket.com/event.jpg"
}
```

---

## Get Events
```
http://localhost:8000/api/v1/lms/event
```
{GET}
*Requires JWT*
