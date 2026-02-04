# Institution Routes

## Create Institution
```
http://localhost:8000/api/v1/lms/institution
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Global University",
  "affiliationNumber": "GU12345",
  "email": "contact@globaluni.edu",
  "domain": "globaluni.edu",
  "phoneNumber": {
    "countryCode": "+91",
    "number": "9876543210"
  },
  "address": "456 University Road, City",
  "institutionType": "UNIVERSITY"
}
```

---

## Get All Institutions
```
http://localhost:8000/api/v1/lms/institution
```
{GET}
*Requires JWT*

---

## Get Institution By ID
```
http://localhost:8000/api/v1/lms/institution/:id
```
{GET}
*Requires JWT*

---

## Update Institution
```
http://localhost:8000/api/v1/lms/institution/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "name": "Global University Updated",
  "email": "admin@globaluni.edu"
}
```

---

## Delete Institution
```
http://localhost:8000/api/v1/lms/institution/:id
```
{DELETE}
*Requires JWT*
