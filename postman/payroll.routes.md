# Payroll Routes

## Generate Payroll (Admin)
```
http://localhost:8000/api/v1/lms/payroll/generate
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "employee": "USER_ID",
  "month": "March",
  "year": 2024,
  "basicSalary": 50000,
  "hra": 10000,
  "da": 5000,
  "allowances": [
    { "type": "TRAVEL", "amount": 2000 }
  ],
  "bonus": 1000,
  "pf": 6000,
  "tax": 2000,
  "professionalTax": 200,
  "otherDeductions": [
    { "type": "LOAN", "amount": 500 }
  ]
}
```

---

## Get Payroll
```
http://localhost:8000/api/v1/lms/payroll
```
{GET}
*Requires JWT*
