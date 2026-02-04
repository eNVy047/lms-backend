# Video Routes

## Create Video (Teacher/Admin)
```
http://localhost:8000/api/v1/lms/video
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
### 📦 Request Body (JSON)
```json
{
  "title": "React Lifecycle Hook",
  "description": "Detailed explanation of useEffect and useState.",
  "videoFile": "https://bucket.com/video.mp4",
  "thumbnail": "https://bucket.com/thumb.jpg",
  "duration": 600
}
```

---

## Get Videos
```
http://localhost:8000/api/v1/lms/video
```
{GET}
*Requires JWT*
