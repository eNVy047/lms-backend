# Institution Setup Routes

## Create Institution Setup
```
http://localhost:8000/api/v1/lms/institution-setup
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_MONGO_ID",
  "registrationCertificate": "https://bucket.com/reg.pdf",
  "affiliationCertificate": "https://bucket.com/aff.pdf",
  "trustRegistration": "https://bucket.com/trust.pdf",
  "panNumber": "ABCDE1234F",
  "bankDetails": {
    "accountName": "Global University",
    "accountNumber": "1234567890",
    "ifsc": "IFSC0001",
    "bankName": "Central Bank",
    "branch": "Main Branch"
  }
}
```

---

## Register Address (Step 1)
```
http://localhost:8000/api/v1/lms/institution-setup/register-address
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "universityName": "Global University",
  "addressLine1": "456 University Road",
  "city": "Metropolis",
  "pincode": "123456",
  "country": "India"
}
```

---

## Verify Contact (Step 2)
```
http://localhost:8000/api/v1/lms/institution-setup/verify-contact
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "email": "contact@globaluni.edu",
  "phone": {
    "countryCode": "+91",
    "number": "9876543210"
  }
}
```

---

## Get Institution Setup
```
http://localhost:8000/api/v1/lms/institution-setup/:institutionId
```
{GET}
*Requires JWT*

---

## Update Institution Setup
```
http://localhost:8000/api/v1/lms/institution-setup/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "bankDetails": {
    "accountName": "Global University Updated"
  }
}
```
