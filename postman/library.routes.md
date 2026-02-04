# Library Routes

## Add Library Asset (Admin)
```
http://localhost:8000/api/v1/lms/library/assets
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "type": "BOOK",
  "title": "Introduction to Algorithms",
  "author": "Cormen",
  "totalCopies": 5,
  "shelfLocation": "A1-02"
}
```

---

## Get Library Inventory
```
http://localhost:8000/api/v1/lms/library/assets
```
{GET}
*Requires JWT*

---

## Issue Library Asset (Admin)
```
http://localhost:8000/api/v1/lms/library/issue
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "assetId": "ASSET_ID",
  "borrowerId": "STUDENT_OR_TEACHER_ID",
  "borrowerModel": "Student",
  "dueDate": "2024-04-15"
}
```

---

## Return Library Asset (Admin)
```
http://localhost:8000/api/v1/lms/library/return/:transactionId
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "finePaid": 0
}
```
