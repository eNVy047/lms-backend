# Inventory Routes

## Create Inventory Item (Admin)
```
http://localhost:8000/api/v1/lms/inventory
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Projector",
  "category": "ELECTRONICS",
  "quantity": 10,
  "unit": "PCS",
  "purchaseDate": "2024-01-15T00:00:00.000Z",
  "purchasePrice": 45000,
  "supplier": "Tech Supplies Corp",
  "location": "Store Room A",
  "status": "AVAILABLE"
}
```

---

## Get All Inventory Items
```
http://localhost:8000/api/v1/lms/inventory
```
{GET}
*Requires JWT*

---

## Get Inventory Item By ID
```
http://localhost:8000/api/v1/lms/inventory/:id
```
{GET}
*Requires JWT*

---

## Update Inventory Item (Admin)
```
http://localhost:8000/api/v1/lms/inventory/:id
```
{PATCH}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "quantity": 15
}
```

---

## Delete Inventory Item (Admin)
```
http://localhost:8000/api/v1/lms/inventory/:id
```
{DELETE}
*Requires JWT*
