# Project Structure

```
tni-au-health-dashboard/
├── client/                          # Frontend React application
│   ├── public/                      # Public assets
│   │   └── vite.svg                # Favicon
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── Layout.tsx          # Main layout with navigation
│   │   │   ├── SoldierModal.tsx    # Modal for soldier CRUD
│   │   │   ├── UnitModal.tsx       # Modal for unit CRUD
│   │   │   └── UserModal.tsx       # Modal for user management
│   │   ├── context/                # React Context providers
│   │   │   └── AuthContext.tsx     # Authentication context
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.tsx       # Main dashboard with charts
│   │   │   ├── Soldiers.tsx        # Soldier management page
│   │   │   ├── Units.tsx           # Unit management page
│   │   │   ├── MapView.tsx         # Interactive map view
│   │   │   ├── Notifications.tsx   # Notification center
│   │   │   ├── ActivityLogs.tsx    # Activity log viewer
│   │   │   ├── Users.tsx           # User management (admin)
│   │   │   └── Login.tsx           # Login page
│   │   ├── services/               # API service layer
│   │   │   └── api.ts              # API calls and axios config
│   │   ├── types/                  # TypeScript type definitions
│   │   │   └── index.ts            # All TypeScript interfaces
│   │   ├── utils/                  # Utility functions
│   │   │   └── exportCSV.ts        # CSV export functionality
│   │   ├── App.tsx                 # Main app component with routing
│   │   ├── main.tsx                # Application entry point
│   │   └── index.css               # Global styles with Tailwind
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tsconfig.node.json          # TypeScript config for Vite
│   ├── vite.config.ts              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   └── .env.example                # Environment variables example
│
├── server/                         # Backend Express application
│   ├── src/
│   │   ├── config/                 # Configuration files
│   │   │   └── database.ts         # MongoDB connection
│   │   ├── controllers/            # Route controllers
│   │   │   ├── authController.ts   # Authentication logic
│   │   │   ├── soldierController.ts # Soldier CRUD operations
│   │   │   ├── unitController.ts   # Unit CRUD operations
│   │   │   ├── notificationController.ts # Notification management
│   │   │   ├── activityLogController.ts  # Activity log handling
│   │   │   └── userController.ts   # User management
│   │   ├── middleware/             # Express middleware
│   │   │   └── auth.ts             # JWT authentication middleware
│   │   ├── models/                 # Mongoose models
│   │   │   ├── User.ts             # User model
│   │   │   ├── Soldier.ts          # Soldier model
│   │   │   ├── Unit.ts             # Unit model
│   │   │   ├── Notification.ts     # Notification model
│   │   │   └── ActivityLog.ts      # Activity log model
│   │   ├── routes/                 # API routes
│   │   │   ├── authRoutes.ts       # Authentication routes
│   │   │   ├── soldierRoutes.ts    # Soldier routes
│   │   │   ├── unitRoutes.ts       # Unit routes
│   │   │   ├── notificationRoutes.ts # Notification routes
│   │   │   ├── activityLogRoutes.ts  # Activity log routes
│   │   │   └── userRoutes.ts       # User routes
│   │   ├── utils/                  # Utility functions
│   │   │   └── seedData.ts         # Database seeding script
│   │   └── server.ts               # Express server entry point
│   ├── package.json                # Backend dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   └── .env.example                # Environment variables example
│
├── .git/                           # Git repository
├── .gitignore                      # Git ignore rules
├── package.json                    # Root package.json for scripts
├── README.md                       # Main project documentation
├── API.md                          # API documentation
├── SETUP.md                        # Setup and installation guide
├── QUICKSTART.md                   # Quick start guide
├── CONTRIBUTING.md                 # Contributing guidelines
├── PROJECT_STRUCTURE.md            # This file
└── LICENSE                         # MIT License

```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Data visualization charts
- **React Leaflet** - Interactive maps
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## Key Features by Module

### 1. Authentication (`/auth`)
- JWT-based authentication
- Password hashing with bcrypt
- Login and registration
- Token expiration handling

### 2. Dashboard (`/`)
- Statistics cards
- Bar charts (personnel by rank)
- Pie charts (personnel by unit)
- Line charts (health trends)
- Real-time data aggregation

### 3. Soldier Management (`/soldiers`)
- CRUD operations
- Search and filtering
- Pagination
- CSV export
- Health status tracking

### 4. Unit Management (`/units`)
- CRUD operations
- Location tracking
- Personnel count
- Commander information

### 5. Map View (`/map`)
- Interactive map with Leaflet
- Marker placement for air bases
- Personnel details per location
- Doctor assignment tracking

### 6. Notifications (`/notifications`)
- System notifications
- Read/unread status
- Type-based styling (info, warning, success, error)
- Delete functionality

### 7. Activity Logs (`/activity-logs`)
- Comprehensive activity tracking
- Filter by action type
- Filter by user
- Pagination
- IP address tracking

### 8. User Management (`/users`)
- Super admin only
- User CRUD operations
- Role assignment
- Account activation/deactivation
- Password management

## Data Flow

### Request Flow
1. Client makes request → API service layer
2. API service adds JWT token → Backend
3. Backend validates token → Controller
4. Controller processes → Model
5. Model interacts with MongoDB
6. Response flows back to client

### Authentication Flow
1. User submits credentials
2. Backend validates credentials
3. JWT token generated
4. Token stored in localStorage
5. Token included in all subsequent requests
6. Token validated on each request

### Activity Logging Flow
1. User performs action (CRUD)
2. Controller executes operation
3. ActivityLog entry created automatically
4. Log includes user, action, entity, timestamp

## Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tni-au-health
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Endpoints Summary

- `/api/auth/*` - Authentication
- `/api/soldiers/*` - Soldier management
- `/api/units/*` - Unit management
- `/api/notifications/*` - Notifications
- `/api/activity-logs/*` - Activity logs
- `/api/users/*` - User management (admin only)

## Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Password Hashing** - bcrypt with salt
3. **Role-Based Access Control** - Super admin, admin, user roles
4. **Input Validation** - Express validator
5. **CORS Protection** - Configured CORS middleware
6. **Activity Logging** - All actions tracked

## Development Scripts

```bash
# Root level
npm run install:all  # Install all dependencies
npm run dev          # Run both frontend and backend
npm run client       # Run only frontend
npm run server       # Run only backend
npm run build        # Build frontend for production

# Server
cd server
npm run dev          # Development with hot reload
npm run build        # Compile TypeScript
npm start            # Production server
npx tsx src/utils/seedData.ts  # Seed database

# Client
cd client
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
```

## File Naming Conventions

- **Components**: PascalCase (e.g., `SoldierModal.tsx`)
- **Pages**: PascalCase (e.g., `Dashboard.tsx`)
- **Utilities**: camelCase (e.g., `exportCSV.ts`)
- **Types**: camelCase file, PascalCase interfaces (e.g., `index.ts`, `User`)
- **API files**: camelCase (e.g., `api.ts`)

## Code Organization Best Practices

1. **Separation of Concerns**: Controllers handle logic, models handle data
2. **DRY Principle**: Reusable components and utilities
3. **Type Safety**: TypeScript throughout the application
4. **Consistent Styling**: Tailwind CSS utility classes
5. **Error Handling**: Try-catch blocks and proper error responses
6. **Documentation**: Comments for complex logic

## Future Enhancements

- Unit tests (Jest, React Testing Library)
- Integration tests (Supertest)
- E2E tests (Playwright)
- CI/CD pipeline (GitHub Actions)
- Docker containerization
- Redis for caching
- WebSocket for real-time updates
- PDF export functionality
- Advanced reporting features
