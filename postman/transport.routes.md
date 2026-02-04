# Transport Routes

## Create Transport Route (Admin)
```
http://localhost:8000/api/v1/lms/transport/routes
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "name": "Route 5 - North City",
  "routeNumber": "R5",
  "stops": [
    { "name": "Stop A", "time": "08:00 AM" },
    { "name": "Stop B", "time": "08:15 AM" }
  ],
  "vehicle": "VEHICLE_ID",
  "charges": 500
}
```

---

## Get Transport Routes
```
http://localhost:8000/api/v1/lms/transport/routes
```
{GET}
*Requires JWT*

---

## Create Vehicle (Admin)
```
http://localhost:8000/api/v1/lms/transport/vehicles
```
{POST}
*Requires JWT*

### 📦 Request Body (JSON)
```json
{
  "institution": "INSTITUTION_ID",
  "vehicleNumber": "DL-12-AB-3456",
  "type": "BUS",
  "capacity": 40,
  "driverName": "Rajesh Kumar",
  "driverPhone": "9087654321",
  "driverLicense": "DL123456789",
  "gpsDeviceId": "GPS-6789"
}
```

---

## Get Vehicles
```
http://localhost:8000/api/v1/lms/transport/vehicles
```
{GET}
*Requires JWT*
