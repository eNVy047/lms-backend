# Fees Routes

## Create Fee Record (Admin Only)
```
http://localhost:8000/api/v1/lms/fees
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "student": "STUDENT_ID",
  "course": "COURSE_ID",
  "semester": 1,
  "amount": 25000,
  "paymentType": "INSTALLMENT",
  "installments": [
    {
      "installmentNumber": 1,
      "amount": 10000,
      "dueDate": "2024-03-01T00:00:00.000Z",
      "description": "First Installment"
    },
    {
      "installmentNumber": 2,
      "amount": 15000,
      "dueDate": "2024-06-01T00:00:00.000Z",
      "description": "Second Installment"
    }
  ],
  "dueDate": "2024-06-01T00:00:00.000Z",
  "description": "Annual Academic Fee"
}
```

---

## Get All Fees (Admin)
```
http://localhost:8000/api/v1/lms/fees
```
{GET}
*Requires JWT*

---

## Get Fee Statistics
```
http://localhost:8000/api/v1/lms/fees/statistics
```
{GET}
*Requires JWT*

---

## Get Student Fees
```
http://localhost:8000/api/v1/lms/fees/student/:studentId
```
{GET}
*Requires JWT*

---

## Get Fee By ID
```
http://localhost:8000/api/v1/lms/fees/:feeId
```
{GET}
*Requires JWT*

---

## Update Fee Record (Admin)
```
http://localhost:8000/api/v1/lms/fees/:feeId
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "amount": 26000,
  "description": "Updated Annual Academic Fee"
}
```

---

## Delete Fee Record (Admin)
```
http://localhost:8000/api/v1/lms/fees/:feeId
```
{DELETE}
*Requires JWT*

---

## Process Full Payment
```
http://localhost:8000/api/v1/lms/fees/:feeId/pay
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "transactionId": "TXN_FULL_123"
}
```

---

## Process Installment Payment
```
http://localhost:8000/api/v1/lms/fees/:feeId/installment/:installmentNumber/pay
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "transactionId": "TXN_INST_123",
  "paidAmount": 10000
}
```
