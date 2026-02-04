# User Routes

## Register User
```
http://localhost:8000/api/v1/user/register
```
{POST}

### 📦 Request Body (JSON)
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password123",
  "phone": {
    "countryCode": "+91",
    "number": "1234567890"
  },
  "role": "STUDENT",
  "address": "123 Street, City"
}
```

---

## Login User
```
http://localhost:8000/api/v1/user/login
```
{POST}

### 📦 Request Body (JSON)
```json
{
  "email": "john.doe@example.com",
  "password": "Password123"
}
```

---

## Refresh Access Token
```
http://localhost:8000/api/v1/user/refresh-token
```
{POST}

### 📦 Request Body (JSON)
```json
{
  "refreshToken": "your_refresh_token_here"
}
```

---

## Verify Email
```
http://localhost:8000/api/v1/user/verify-email/:verificationToken
```
{GET}

---

## Forgot Password
```
http://localhost:8000/api/v1/user/forgot-password
```
{POST}

### 📦 Request Body (JSON)
```json
{
  "email": "john.doe@example.com"
}
```

---

## Reset Password
```
http://localhost:8000/api/v1/user/reset-password/:resetToken
```
{POST}

### 📦 Request Body (JSON)
```json
{
  "newPassword": "NewStrongPassword123"
}
```

---

## Logout User
```
http://localhost:8000/api/v1/user/logout
```
{POST}
*Requires JWT*

---

## Change Current Password
```
http://localhost:8000/api/v1/user/change-password
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "oldPassword": "Password123",
  "newPassword": "NewStrongPassword123"
}
```

---

## Get Current User
```
http://localhost:8000/api/v1/user/current-user
```
{GET}
*Requires JWT*

---

## Update Account Details
```
http://localhost:8000/api/v1/user/update-account
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com"
}
```

---

## Update User Avatar
```
http://localhost:8000/api/v1/user/avatar
```
{PATCH}
*Requires JWT*
*Content-Type: multipart/form-data*

### 📁 Form Data
- `avatar`: (File)

---

## All Installed Apps
```
http://localhost:8000/api/v1/user/installed-apps
```
{GET}
*Requires JWT*

---

## Install App
```
http://localhost:8000/api/v1/user/install-app
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "appKey": "lms"
}
```

---

## Uninstall App
```
http://localhost:8000/api/v1/user/uninstall-app
```
{DELETE}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "appKey": "lms"
}
```

---

## Resend Email Verification
```
http://localhost:8000/api/v1/user/resend-email-verification
```
{POST}
*Requires JWT*

---

## Verify Phone OTP
```
http://localhost:8000/api/v1/user/verify-otp
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "otp": "123456"
}
```

---

## Resend Phone OTP
```
http://localhost:8000/api/v1/user/resend-otp
```
{POST}
*Requires JWT*

---

## Google SSO Login
```
http://localhost:8000/api/v1/user/google
```
{GET}

---

## GitHub SSO Login
```
http://localhost:8000/api/v1/user/github
```
{GET}
