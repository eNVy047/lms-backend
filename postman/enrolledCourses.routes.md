# Enrolled Courses Routes

## Enroll In Course
```
http://localhost:8000/api/v1/lms/enrolled-courses
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "user": "USER_ID",
  "course": "COURSE_ID"
}
```

---

## Get Own Enrollments
```
http://localhost:8000/api/v1/lms/enrolled-courses/user
```
{GET}
*Requires JWT*

---

## Get User Enrollments (Admin)
```
http://localhost:8000/api/v1/lms/enrolled-courses/user/:userId
```
{GET}
*Requires JWT*

---

## Remove Enrollment
```
http://localhost:8000/api/v1/lms/enrolled-courses/:id
```
{DELETE}
*Requires JWT*
