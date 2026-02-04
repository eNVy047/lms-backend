# Like Routes

## Toggle Like
```
http://localhost:8000/api/v1/lms/like
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "contentId": "VIDEO_OR_NOTES_ID",
  "contentType": "Video"
}
```
