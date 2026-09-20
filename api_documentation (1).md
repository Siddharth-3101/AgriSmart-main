# AgriSmart Full API Documentation & Architecture Reference

This document provides a complete, exhaustive reference of all REST API endpoints, Machine Learning (ML) engines, and Artificial Intelligence (AI) advisory services across the AgriSmart smart agriculture ecosystem.

---

## Service Architecture & Port Mapping

| Service Name | Technology Stack | Port | Base URL | Primary Role |
| :--- | :--- | :--- | :--- | :--- |
| **User Service** | Java 23 / Spring Boot 3.3.4 | `8081` | `http://localhost:8081` | Auth (JWT), User Profiles, Soil Parameters, Documents, Audit Logs |
| **Farm Service** | Java 23 / Spring Boot 3.3.4 | `8082` | `http://localhost:8082` | Farm plot registry, boundary polygons, geo-coordinates, soil/water meta |
| **Crop Service** | Java 23 / Spring Boot 3.3.4 | `8083` | `http://localhost:8083` | Crop cultivation lifecycle, polygon sub-plots, Gemini AI chatbot |
| **Weather Service** | Java 23 / Spring Boot 3.3.4 | `8084` | `http://localhost:8084` | OpenWeatherMap live ingestion, 5-day forecasts, historical logs |
| **Analytics Service** | Java 23 / Spring Boot 3.3.4 | `8085` | `http://localhost:8085` | Role dashboards, Government schemes, Notifications/Alerts, Events/RSVPs |
| **AI Advisory Service** | Java 23 / Spring Boot 3.3.4 | `8086` | `http://localhost:8086` | Real-time multi-service data aggregation & CatBoost inference proxy |
| **Fertilizer & Irrigation AI** | Python Flask / CatBoost | `5000` | `http://localhost:5000` | CatBoost ML inference for NPK fertilizer dosage and irrigation schedule |
| **Crop Recommendation ML** | Python FastAPI / Scikit-Learn | `8000` | `http://localhost:8000` | Random Forest Crop Recommendation engine with location prevalence (31 crops) |

---

## Authentication & Authorization

All protected endpoints require a JWT token passed in the HTTP request headers:
- **Header Key**: `Authorization`
- **Header Value**: `Bearer <JWT_ACCESS_TOKEN>`

### User Roles & Permissions
- `FARMER`: Registers farms, logs crop cultivation, uploads identity/land documents, queries AI advisory, applies to government schemes, RSVPs for events.
- `OFFICER`: Regional oversight, views registered farmers and crop distributions in assigned state/district, verifies/rejects farmer documents, reviews scheme applications, issues emergency weather/pest broadcasts, manages farmer events.
- `ADMIN`: System-wide access, verifies and assigns officers to regions, creates and manages government schemes, inspects immutable platform audit logs, monitors system health metrics.

---

## 1. User & Identity Microservice (Port 8081)

Base URL: `http://localhost:8081`

### 1.1 Authentication & Profile Management

#### Register User
- **Method**: `POST`
- **Path**: `/api/users/register`
- **Auth Required**: No
- **Request Body (JSON)**:
  ```json
  {
    "name": "Ramesh Kumar",
    "email": "ramesh@agrismart.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "FARMER",
    "district": "Coimbatore",
    "state": "Tamil Nadu"
  }
  ```
  *(Note: Role must be `FARMER`, `OFFICER`, or `ADMIN`)*
- **Response (201 Created)**:
  ```json
  {
    "id": 1,
    "name": "Ramesh Kumar",
    "email": "ramesh@agrismart.com",
    "role": "FARMER",
    "phone": "9876543210",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "verified": true,
    "assignedDistrict": null,
    "assignedState": null
  }
  ```

#### Login / Authenticate User
- **Method**: `POST`
- **Path**: `/api/users/login`
- **Auth Required**: No
- **Request Body (JSON)**:
  ```json
  {
    "email": "ramesh@agrismart.com",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer",
    "id": 1,
    "name": "Ramesh Kumar",
    "email": "ramesh@agrismart.com",
    "role": "FARMER",
    "phone": "9876543210",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "verified": true
  }
  ```

#### Get Current Profile
- **Method**: `GET`
- **Path**: `/api/users/profile`
- **Auth Required**: Yes (`FARMER`, `OFFICER`, `ADMIN`)
- **Response (200 OK)**: Returns profile details of the authenticated user.

#### Update Current Profile
- **Method**: `PUT`
- **Path**: `/api/users/profile`
- **Auth Required**: Yes
- **Request Body (JSON)**:
  ```json
  {
    "name": "Ramesh Kumar",
    "phone": "9876543210",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "dob": "1985-05-15",
    "gender": "Male",
    "taluk": "Pollachi",
    "village": "Anamalai",
    "pincode": "642104",
    "landOwnershipType": "Owned",
    "totalLandholding": 4.5,
    "farmerCategory": "Small & Marginal",
    "ownershipDocumentAvailable": true,
    "annualIncomeRange": "₹1,00,000 - ₹2,50,000",
    "incomeCertificateAvailable": true,
    "hasTractor": true,
    "hasMachinery": false,
    "hasIrrigationEquipment": true,
    "hasPumpSet": true,
    "hasStorageFacility": false,
    "hasGreenhouse": false,
    "farmingType": "Organic & Conventional",
    "yearsFarming": 12,
    "organizationMembership": "Coimbatore Farmers Producer Org",
    "nitrogen": 65.0,
    "phosphorus": 42.0,
    "potassium": 55.0,
    "soilPh": 6.8,
    "soilMoisture": 38.0,
    "organicCarbon": 1.1,
    "electricalConductivity": 0.85,
    "password": "newpassword123"
  }
  ```

#### Get User Soil Health Parameters
- **Method**: `GET`
- **Path**: `/api/users/soil-health`
- **Auth Required**: Yes
- **Description**: Returns soil health metrics (N, P, K, pH, Moisture, Organic Carbon, Electrical Conductivity) used by AI models.
- **Response (200 OK)**:
  ```json
  {
    "nitrogen": 65.0,
    "phosphorus": 42.0,
    "potassium": 55.0,
    "soilPh": 6.8,
    "soilMoisture": 38.0,
    "organicCarbon": 1.1,
    "electricalConductivity": 0.85
  }
  ```

#### Get User Details by ID
- **Method**: `GET`
- **Path**: `/api/users/{id}`
- **Auth Required**: Yes

#### Get All Users (Admin / Officer Only)
- **Method**: `GET`
- **Path**: `/api/users`
- **Query Params**: `page` (default 0), `size` (default 10)
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Get All Farmers
- **Method**: `GET`
- **Path**: `/api/users/farmers`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)
- **Description**: Returns farmers. If called by an `OFFICER`, automatically filters to farmers within the officer's assigned state and district.

#### Get All Officers (Admin Only)
- **Method**: `GET`
- **Path**: `/api/users/officers`
- **Auth Required**: Yes (`ADMIN`)

#### Verify / Revoke Officer Account (Admin Only)
- **Method**: `PUT`
- **Path**: `/api/users/officers/{id}/verify`
- **Query Params**: `verified` (boolean, default `true`)
- **Auth Required**: Yes (`ADMIN`)

#### Assign Officer Region (Admin Only)
- **Method**: `PUT`
- **Path**: `/api/users/officers/{id}/assignment`
- **Auth Required**: Yes (`ADMIN`)
- **Request Body (JSON)**:
  ```json
  {
    "district": "Coimbatore",
    "state": "Tamil Nadu"
  }
  ```

#### User Service Health Check
- **Method**: `GET`
- **Path**: `/api/users/health`
- **Auth Required**: No

---

### 1.2 Farmer Document Management API

Base URL: `http://localhost:8081`

#### Upload Document
- **Method**: `POST`
- **Path**: `/api/documents/upload`
- **Auth Required**: Yes (`FARMER`)
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `documentType` (text): e.g., `"Aadhaar Card"`, `"Land Ownership Deed (Patta/Chitta)"`, `"Soil Health Certificate"`, `"Income Certificate"`, `"Bank Passbook"`
  - `file` (binary file)
- **Response (200 OK)**:
  ```json
  {
    "documentId": 12,
    "userId": 1,
    "userName": "Ramesh Kumar",
    "userEmail": "ramesh@agrismart.com",
    "documentType": "Land Ownership Deed (Patta/Chitta)",
    "originalFilename": "patta_chitta_doc.pdf",
    "fileSize": 1048576,
    "mimeType": "application/pdf",
    "verificationStatus": "PENDING",
    "verifiedByOfficerId": null,
    "verifiedAt": null,
    "rejectionRemarks": null,
    "uploadedAt": "2026-09-19T10:30:00"
  }
  ```

#### Get My Uploaded Documents
- **Method**: `GET`
- **Path**: `/api/documents/my`
- **Auth Required**: Yes (`FARMER`)

#### Get All Farmer Documents
- **Method**: `GET`
- **Path**: `/api/documents/all`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Get Documents for Specific Farmer
- **Method**: `GET`
- **Path**: `/api/documents/user/{userId}`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Download Document
- **Method**: `GET`
- **Path**: `/api/documents/{documentId}/download`
- **Auth Required**: Yes (JWT Bearer Token required)
- **Description**: Returns binary document stream with original MIME type and attachment filename. Farmers can only download their own documents; Officers and Admins can download any.

#### Verify or Reject Document
- **Method**: `PUT`
- **Path**: `/api/documents/{documentId}/verify`
- **Query Params**:
  - `status` (string, required): `"VERIFIED"` or `"REJECTED"`
  - `remarks` (string, optional): Rejection feedback or verification notes
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Delete Own Document
- **Method**: `DELETE`
- **Path**: `/api/documents/{documentId}`
- **Auth Required**: Yes (`FARMER`)

---

### 1.3 Administrative Audit Logs

#### Get System Audit Logs
- **Method**: `GET`
- **Path**: `/api/audit-logs`
- **Auth Required**: Yes (`ADMIN`)
- **Description**: Retrieves immutable append-only trail of all administrative actions (officer approvals, region reassignments, scheme modifications, status changes).
- **Response (200 OK)**:
  ```json
  [
    {
      "logId": 101,
      "action": "OFFICER_VERIFIED",
      "actorId": 1,
      "actorName": "System Administrator",
      "targetType": "OFFICER",
      "targetId": "4",
      "details": "Verified officer Dr. Priya Sharma for Coimbatore district",
      "timestamp": "2026-09-19T09:15:00"
    }
  ]
  ```

---

## 2. Farm Management Microservice (Port 8082)

Base URL: `http://localhost:8082`

#### Register New Farm Plot
- **Method**: `POST`
- **Path**: `/api/farms`
- **Auth Required**: Yes (`FARMER`)
- **Request Body (JSON)**:
  ```json
  {
    "farmName": "Green Valley Farm",
    "location": "Pollachi, Coimbatore | [[10.658,77.008],[10.659,77.008],[10.659,77.010],[10.658,77.010]]",
    "area": 4.5,
    "soilType": "Black Soil",
    "waterSource": "Borewell",
    "latitude": 10.6585,
    "longitude": 77.0090
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "farmId": 1,
    "userId": 1,
    "farmName": "Green Valley Farm",
    "location": "Pollachi, Coimbatore | [[10.658,77.008],[10.659,77.008],[10.659,77.010],[10.658,77.010]]",
    "area": 4.5,
    "soilType": "Black Soil",
    "waterSource": "Borewell",
    "latitude": 10.6585,
    "longitude": 77.0090,
    "createdAt": "2026-09-19T10:00:00"
  }
  ```

#### Update Farm Plot
- **Method**: `PUT`
- **Path**: `/api/farms/{id}`
- **Auth Required**: Yes (`FARMER` - plot owner)
- **Request Body (JSON)**: Same schema as Register Farm Plot.

#### Delete Farm Plot
- **Method**: `DELETE`
- **Path**: `/api/farms/{id}`
- **Auth Required**: Yes (`FARMER` - plot owner)
- **Description**: Deletes the farm and cascades deletion to all associated crop records and weather logs.

#### Get Farm Plot by ID
- **Method**: `GET`
- **Path**: `/api/farms/{id}`
- **Auth Required**: Yes (Plot owner, Officer, or Admin)

#### View Farms List
- **Method**: `GET`
- **Path**: `/api/farms`
- **Query Params**:
  - `page` (default 0)
  - `size` (default 10)
  - `sortBy` (default `farmId`)
  - `sortDir` (`asc` or `desc`, default `asc`)
- **Auth Required**: Yes (Farmers receive own farms; Officers and Admins receive all registered farms)

#### Farm Service Health Check
- **Method**: `GET`
- **Path**: `/api/farms/health`
- **Auth Required**: No

---

## 3. Crop Cultivation & Agronomist Chatbot Microservice (Port 8083)

Base URL: `http://localhost:8083`

#### Register New Crop Record
- **Method**: `POST`
- **Path**: `/api/crops`
- **Auth Required**: Yes (`FARMER`)
- **Request Body (JSON)**:
  ```json
  {
    "cropName": "Rice (Paddy)",
    "duration": 120,
    "description": "Area: 2.0 Acres | Coordinates: [[10.6582,77.0082],[10.6588,77.0082],[10.6588,77.0091],[10.6582,77.0091]]",
    "status": "ACTIVE",
    "season": "KHARIF",
    "plantedDate": "2026-08-01",
    "expectedHarvestDate": "2026-11-29",
    "farmId": 1
  }
  ```

#### Update Crop Record
- **Method**: `PUT`
- **Path**: `/api/crops/{id}`
- **Auth Required**: Yes (`FARMER`)
- **Request Body (JSON)**:
  ```json
  {
    "cropName": "Rice (Paddy)",
    "duration": 120,
    "description": "Harvest completed with strong yield.",
    "status": "HARVESTED",
    "season": "KHARIF",
    "plantedDate": "2026-08-01",
    "expectedHarvestDate": "2026-11-29",
    "farmId": 1,
    "yield": 4.2
  }
  ```

#### Track Crop Lifecycle Status
- **Method**: `PATCH`
- **Path**: `/api/crops/{id}/status`
- **Query Params**: `status` (`ACTIVE`, `GROWING`, `HARVESTED`, `FAILED`, `WASTED`)
- **Auth Required**: Yes (`FARMER`)

#### Delete Crop Record
- **Method**: `DELETE`
- **Path**: `/api/crops/{id}`
- **Auth Required**: Yes (`FARMER`)

#### Get Crop Details by ID
- **Method**: `GET`
- **Path**: `/api/crops/{id}`
- **Auth Required**: Yes

#### View Crops List
- **Method**: `GET`
- **Path**: `/api/crops`
- **Query Params**:
  - `farmId` (optional): Filter crops for a specific farm
  - `page` (default 0)
  - `size` (default 10)
  - `sortBy` (default `cropId`)
  - `sortDir` (default `asc`)
- **Auth Required**: Yes

#### Query AI Agronomist Chatbot
- **Method**: `POST`
- **Path**: `/api/crops/chatbot`
- **Auth Required**: Yes
- **Description**: Context-aware AI Agronomist chatbot powered by **Google Gemini 1.5 Flash** with an automatic offline fallback engine supporting multilingual queries in **English (`en`)**, **Hindi (`hi`)**, **Punjabi (`pb`/`pun`)**, and **Tamil (`ta`)**.
- **Request Body (JSON)**:
  ```json
  {
    "message": "What is the recommended fertilizer schedule for rice in Coimbatore?",
    "language": "en",
    "farmerName": "Ramesh Kumar",
    "district": "Coimbatore",
    "state": "Tamil Nadu",
    "soilType": "Black Soil",
    "activeCrops": ["Rice (Paddy)"],
    "history": [
      { "sender": "user", "text": "Hello, my paddy crops are 30 days old." },
      { "sender": "bot", "text": "At 30 days, your paddy is entering active tillering stage." }
    ]
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "reply": "For Rice (Paddy) in Black Soil: Apply NPK 120:60:60 kg/ha. Apply 50% Nitrogen as basal dosage and the remaining split between tillering and panicle initiation stages."
  }
  ```

#### Crop Service Health Check
- **Method**: `GET`
- **Path**: `/api/crops/health`
- **Auth Required**: No

---

## 4. Weather Intelligence Microservice (Port 8084)

Base URL: `http://localhost:8084`

#### Get Current Weather for Farm
- **Method**: `GET`
- **Path**: `/api/weather/current/{farmId}`
- **Auth Required**: Yes
- **Description**: Fetches live weather readings for the farm's latitude & longitude using OpenWeatherMap API and automatically saves the record into the farm's historical log.
- **Response (200 OK)**:
  ```json
  {
    "farmId": 1,
    "temperature": 29.5,
    "humidity": 68.0,
    "rainfall": 0.0,
    "windSpeed": 4.2,
    "condition": "Partly Cloudy",
    "description": "scattered clouds",
    "icon": "03d",
    "recordedAt": "2026-09-19T11:00:00"
  }
  ```

#### Get 5-Day Weather Forecast
- **Method**: `GET`
- **Path**: `/api/weather/forecast/{farmId}`
- **Auth Required**: Yes
- **Response (200 OK)**:
  ```json
  {
    "farmId": 1,
    "forecastList": [
      {
        "date": "2026-09-20",
        "tempMin": 22.0,
        "tempMax": 31.5,
        "humidity": 72.0,
        "rainfall": 12.5,
        "condition": "Rain",
        "description": "moderate rain"
      }
    ]
  }
  ```

#### Get Historical Weather Logs
- **Method**: `GET`
- **Path**: `/api/weather/history/{farmId}`
- **Auth Required**: Yes

#### Weather Service Health Check
- **Method**: `GET`
- **Path**: `/api/weather/health`
- **Auth Required**: No

---

## 5. Analytics, Schemes & Notification Microservice (Port 8085)

Base URL: `http://localhost:8085`

### 5.1 Dashboard Analytics

#### Get Farmer Dashboard Analytics
- **Method**: `GET`
- **Path**: `/api/analytics/farmer`
- **Auth Required**: Yes (`FARMER`)
- **Response (200 OK)**: Returns total farms, active crops count, estimated yield forecast, and applied scheme status counts.

#### Get Officer Dashboard Analytics
- **Method**: `GET`
- **Path**: `/api/analytics/officer`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)
- **Response (200 OK)**: Returns regional farmer counts, cultivated land acreage, crop distribution breakdown, pending document verification counts, and scheme application totals.

#### Get Admin System Analytics
- **Method**: `GET`
- **Path**: `/api/analytics/admin`
- **Auth Required**: Yes (`ADMIN`)
- **Response (200 OK)**: Returns platform-wide user metrics, active microservice states, document verification volume, and audit log summaries.

#### Analytics Service Health Check
- **Method**: `GET`
- **Path**: `/api/analytics/health`
- **Auth Required**: No

---

### 5.2 Government Schemes & Subsidies API

Base URL: `http://localhost:8085`

#### Get All Government Schemes
- **Method**: `GET`
- **Path**: `/api/schemes`
- **Auth Required**: Yes

#### Check Eligible Recommended Schemes
- **Method**: `GET`
- **Path**: `/api/schemes/recommend`
- **Auth Required**: Yes (`FARMER`)
- **Description**: Dynamically calculates and returns schemes matching the farmer's landholding size, state, district, and active crops.

#### Apply to Government Scheme
- **Method**: `POST`
- **Path**: `/api/schemes/apply`
- **Query Params**: `schemeId` (Long, required)
- **Auth Required**: Yes (`FARMER`)

#### Withdraw Scheme Application
- **Method**: `DELETE`
- **Path**: `/api/schemes/withdraw`
- **Query Params**: `schemeId` (Long, required)
- **Auth Required**: Yes (`FARMER`)

#### View My Applications
- **Method**: `GET`
- **Path**: `/api/schemes/applications/me`
- **Auth Required**: Yes (`FARMER`)

#### View User Applications
- **Method**: `GET`
- **Path**: `/api/schemes/applications/user/{userId}`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### View All Applications
- **Method**: `GET`
- **Path**: `/api/schemes/applications`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Update Application Status
- **Method**: `PUT`
- **Path**: `/api/schemes/applications/{applicationId}/status`
- **Query Params**: `status` (`APPROVED`, `REJECTED`, `PENDING`)
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Get Scheme Statistics
- **Method**: `GET`
- **Path**: `/api/schemes/stats`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Create Government Scheme (Admin Only)
- **Method**: `POST`
- **Path**: `/api/schemes`
- **Auth Required**: Yes (`ADMIN`)
- **Request Body (JSON)**:
  ```json
  {
    "schemeName": "PM-Kisan Samman Nidhi",
    "description": "Financial support of ₹6,000 per year in three equal installments to farmer families.",
    "eligibility": "Small and marginal farmers owning cultivable land up to 2 hectares.",
    "category": "Financial Support",
    "maxArea": 5.0,
    "targetState": "All India",
    "benefits": "₹6,000 / year direct cash transfer"
  }
  ```

#### Update Government Scheme (Admin Only)
- **Method**: `PUT`
- **Path**: `/api/schemes/{schemeId}`
- **Auth Required**: Yes (`ADMIN`)
- **Request Body (JSON)**: Same as Create Scheme.

#### Delete Government Scheme (Admin Only)
- **Method**: `DELETE`
- **Path**: `/api/schemes/{schemeId}`
- **Auth Required**: Yes (`ADMIN`)

---

### 5.3 Regional Broadcasts & Alerts API

Base URL: `http://localhost:8085`

#### Create Alert Broadcast
- **Method**: `POST`
- **Path**: `/api/notifications`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)
- **Request Body (JSON)**:
  ```json
  {
    "title": "Severe Cyclone / Heavy Rain Alert",
    "message": "Heavy rainfall exceeding 70mm expected in Coimbatore over next 48 hours. Postpone all fertilizer spraying and ensure drainage channels are clear.",
    "type": "WEATHER",
    "priority": "HIGH",
    "targetRegion": "Coimbatore"
  }
  ```

#### View All Notifications
- **Method**: `GET`
- **Path**: `/api/notifications`
- **Auth Required**: Yes (Returns all broadcasts; farmers receive broadcasts filtered to their district/state).

#### Delete Notification
- **Method**: `DELETE`
- **Path**: `/api/notifications/{id}`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Get Notification Statistics
- **Method**: `GET`
- **Path**: `/api/notifications/stats`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

---

### 5.4 Farmer Events, Workshops & RSVPs API

Base URL: `http://localhost:8085`

#### List All Events
- **Method**: `GET`
- **Path**: `/api/events`
- **Auth Required**: Yes

#### Create Farmer Event (Officer / Admin)
- **Method**: `POST`
- **Path**: `/api/events`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)
- **Request Body (JSON)**:
  ```json
  {
    "title": "Organic Drip Irrigation & Soil Workshop",
    "description": "Hands-on field demonstration on precision drip fertigation and soil organic carbon enrichment.",
    "eventDate": "2026-10-15 10:00 AM",
    "location": "TNAU Auditorium, Coimbatore",
    "category": "WORKSHOP"
  }
  ```

#### Delete Event (Officer / Admin)
- **Method**: `DELETE`
- **Path**: `/api/events/{id}`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Register / RSVP for Event
- **Method**: `POST`
- **Path**: `/api/events/{id}/register`
- **Auth Required**: Yes (`FARMER`)
- **Request Body (JSON)**:
  ```json
  {
    "farmerName": "Ramesh Kumar",
    "phoneNumber": "9876543210",
    "attendeesCount": 2,
    "remarks": "Interested in organic fertigation for paddy"
  }
  ```

#### Get Event Attendees List
- **Method**: `GET`
- **Path**: `/api/events/{id}/registrations`
- **Auth Required**: Yes (`OFFICER`, `ADMIN`)

#### Get My Registered Events
- **Method**: `GET`
- **Path**: `/api/events/registrations/my`
- **Auth Required**: Yes (`FARMER`)

---

## 6. AI Advisory Microservice (Java Spring Boot - Port 8086)

Base URL: `http://localhost:8086`

### Generate Comprehensive AI Fertilizer & Irrigation Advisory
- **Method**: `POST`
- **Path**: `/api/ai/recommendation`
- **Auth Required**: Optional / JWT Header Recommended
- **Description**: Orchestrator endpoint that calls User Service (soil health), Farm Service (plot area, soil type, water source), Crop Service (crop name, growth stage), and Weather Service (live temperature, humidity, rainfall). Formulates a 17-parameter input matrix and queries the CatBoost ML backend on port 5000.
- **Request Body (JSON)**:
  ```json
  {
    "farmId": 1,
    "cropId": 1
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "fertilizer": "NPK 120:60:60 (Standard Balanced Dosage with 50% Basal Urea)",
    "irrigation": "Drip Irrigation (Every 3 Days - 25mm dosage)",
    "crop": "AI recommendation generated for Rice (Paddy) using your real farm, crop, soil health and weather data."
  }
  ```

#### AI Advisory Service Health Check
- **Method**: `GET`
- **Path**: `/api/ai/health`
- **Auth Required**: No

---

## 7. AI CatBoost Fertilizer & Irrigation ML Service (Python Flask - Port 5000)

Base URL: `http://localhost:5000`

### 7.1 Health & Model Status
- **Method**: `GET`
- **Path**: `/`
- **Response (200 OK)**:
  ```json
  {
    "message": "AgriSmart AI Service is running",
    "fertilizer_model": "loaded",
    "irrigation_model": "loaded"
  }
  ```

### 7.2 CatBoost ML Recommendation
- **Method**: `POST`
- **Path**: `/api/ai/recommend`
- **Request Body (JSON)**:
  ```json
  {
    "soil_type": "Clay",
    "soil_ph": 6.5,
    "soil_moisture": 35.0,
    "organic_carbon": 1.0,
    "electrical_conductivity": 1.0,
    "nitrogen_level": 60.0,
    "phosphorus_level": 40.0,
    "potassium_level": 50.0,
    "temperature": 28.0,
    "humidity": 70.0,
    "rainfall": 15.0,
    "crop_type": "Rice",
    "growth_stage": "Vegetative",
    "season": "Kharif",
    "irrigation_type": "Rainfed",
    "previous_crop": "Wheat",
    "region": "South",
    "sunlight_hours": 8.0,
    "wind_speed_kmh": 4.0,
    "water_source": "Borewell",
    "field_area_hectare": 1.8,
    "mulching_used": "No",
    "previous_irrigation_mm": 0.0
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "fertilizerRecommendation": "NPK 120:60:60 (Standard Balanced Dosage)",
    "irrigationRecommendation": "Drip Irrigation (Every 3 Days)"
  }
  ```

---

## 8. AgriSmart Crop Recommendation ML Engine (Python FastAPI - Port 8000)

Base URL: `http://localhost:8000`

### Multi-Factor Crop Recommendation Engine
- **Method**: `POST`
- **Path**: `/recommend`
- **Description**: Uses a Random Forest ML model trained across 31 crop varieties with location-prevalence scoring to recommend top 5 highest yielding and climate-suitable crops.
- **Request Body (JSON)**:
  ```json
  {
    "nitrogen": 65.0,
    "phosphorus": 42.0,
    "potassium": 55.0,
    "ph": 6.8,
    "soilType": "Black Soil",
    "temperature": 29.5,
    "humidity": 68.0,
    "rainfall": 850.0,
    "season": "Kharif",
    "waterAvailability": "Borewell",
    "location": "Coimbatore, Tamil Nadu"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "recommendations": [
      {
        "cropName": "Rice",
        "crop": "Rice",
        "confidence": 0.95,
        "reasoning": "Suitable for Black Soil and borewell water. High regional cultivation rate in Coimbatore, Tamil Nadu."
      },
      {
        "cropName": "Cotton",
        "crop": "Cotton",
        "confidence": 0.88,
        "reasoning": "Suitable for Black Soil and borewell water. High regional cultivation rate in Coimbatore, Tamil Nadu."
      },
      {
        "cropName": "Sugarcane",
        "crop": "Sugarcane",
        "confidence": 0.82,
        "reasoning": "Suitable for Black Soil and borewell water."
      },
      {
        "cropName": "Groundnut",
        "crop": "Groundnut",
        "confidence": 0.76,
        "reasoning": "Suitable for Black Soil and borewell water."
      },
      {
        "cropName": "Maize",
        "crop": "Maize",
        "confidence": 0.70,
        "reasoning": "Suitable for Black Soil and borewell water."
      }
    ]
  }
  ```
