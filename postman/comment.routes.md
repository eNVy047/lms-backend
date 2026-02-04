# Comment Routes

## Add Comment
```
http://localhost:8000/api/v1/lms/comment
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "content": "This is a great resource!",
  "contentId": "VIDEO_OR_NOTES_ID",
  "contentType": "Video"
}
```

---

## Get Comments for Content
```
http://localhost:8000/api/v1/lms/comment/:contentId
```
{GET}
*Requires JWT*
