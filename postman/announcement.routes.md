# Announcement Routes

## Create Announcement (Admin/Teacher)
```
http://localhost:8000/api/v1/lms/announcement
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "title": "University Holiday",
  "content": "Tomorrow will be a holiday due to local festivals.",
  "authorModel": "Institution"
}
```

---

## Get Announcements
```
http://localhost:8000/api/v1/lms/announcement
```
{GET}
*Requires JWT*
