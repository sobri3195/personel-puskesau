# API Documentation - Sistem Data Kesehatan TNI AU

Base URL: `http://localhost:5000/api`

## Authentication

All endpoints except `/auth/login` and `/auth/register` require authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /auth/login
Login to get JWT token.

**Request Body:**
```json
{
  "email": "admin@tni-au.mil.id",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Administrator",
    "email": "admin@tni-au.mil.id",
    "role": "super_admin"
  }
}
```

#### POST /auth/register
Register a new user (requires authentication).

**Request Body:**
```json
{
  "name": "New User",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

### Soldiers

#### GET /soldiers
Get all soldiers with pagination and filters.

**Query Parameters:**
- `search` - Search by name or NRP
- `rank` - Filter by rank
- `unit` - Filter by unit
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "soldiers": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

#### GET /soldiers/stats
Get soldier statistics for dashboard.

**Response:**
```json
{
  "total": 100,
  "noEducation": 20,
  "specialists": 30,
  "avgServiceDuration": 10.5,
  "byRank": [...],
  "byUnit": [...],
  "healthStats": [...]
}
```

#### GET /soldiers/:id
Get a single soldier by ID.

#### POST /soldiers
Create a new soldier.

**Request Body:**
```json
{
  "nrp": "10101001",
  "name": "Mayor dr. Surya Pratama",
  "rank": "Mayor",
  "corps": "Kesehatan",
  "unit": "RSAU dr. Esnawan Antariksa",
  "education": "S2",
  "specialization": "Dokter Umum",
  "serviceDuration": 12,
  "healthStatus": "Sehat",
  "bloodType": "A+"
}
```

#### PUT /soldiers/:id
Update a soldier.

#### DELETE /soldiers/:id
Delete a soldier.

### Units

#### GET /units
Get all units with filters.

**Query Parameters:**
- `search` - Search by name or code
- `type` - Filter by type
- `base` - Filter by base

#### GET /units/locations
Get all units with location data and doctors for map view.

**Response:**
```json
[
  {
    "id": "...",
    "name": "Lanud Halim Perdanakusuma",
    "code": "HALIM",
    "base": "Jakarta",
    "location": {
      "latitude": -6.2665,
      "longitude": 106.8907
    },
    "personnelCount": 50,
    "doctors": [...]
  }
]
```

#### GET /units/:id
Get a single unit by ID.

#### POST /units
Create a new unit.

**Request Body:**
```json
{
  "name": "Lanud Example",
  "code": "EXAMPLE",
  "type": "Lanud",
  "base": "City Name",
  "location": {
    "latitude": -6.2665,
    "longitude": 106.8907
  },
  "commander": "Kolonel Name"
}
```

#### PUT /units/:id
Update a unit.

#### DELETE /units/:id
Delete a unit.

### Notifications

#### GET /notifications
Get all notifications (limited to 50 most recent).

#### POST /notifications
Create a new notification.

**Request Body:**
```json
{
  "title": "Notification Title",
  "message": "Notification message content",
  "type": "info"
}
```

Type options: `info`, `warning`, `success`, `error`

#### PATCH /notifications/:id/read
Mark a notification as read.

#### DELETE /notifications/:id
Delete a notification.

### Activity Logs

#### GET /activity-logs
Get activity logs with pagination and filters.

**Query Parameters:**
- `userId` - Filter by user ID
- `action` - Filter by action (create, read, update, delete, login, logout, export)
- `startDate` - Filter by start date
- `endDate` - Filter by end date
- `page` - Page number
- `limit` - Items per page (default: 20)

**Response:**
```json
{
  "logs": [...],
  "pagination": {
    "total": 500,
    "page": 1,
    "pages": 25
  }
}
```

#### POST /activity-logs
Create an activity log (usually done automatically by the system).

### Users (Super Admin Only)

#### GET /users
Get all users.

#### GET /users/:id
Get a single user by ID.

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

Role options: `user`, `admin`, `super_admin`

#### PUT /users/:id
Update a user.

#### DELETE /users/:id
Delete a user.

#### PATCH /users/:id/toggle-status
Toggle user active status (activate/deactivate).

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error message description"
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider adding rate limiting middleware.

## Notes

- All dates are in ISO 8601 format
- All endpoints return JSON
- Activity logs are automatically created for all CRUD operations
- Authentication token expires after 24 hours
