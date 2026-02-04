# Settings Routes

## Get System Settings
```
http://localhost:8000/api/v1/lms/settings/:institutionId
```
{GET}
*Requires JWT*

---

## Update System Settings (Admin)
```
http://localhost:8000/api/v1/lms/settings/:institutionId
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "theme": "dark",
  "notificationsEnabled": true,
  "academicYear": "2024-25"
}
```
