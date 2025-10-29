# Setup Guide - Sistem Data Kesehatan TNI AU

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tni-au-health-dashboard
```

### 2. Install Dependencies

```bash
# Install root dependencies and all subdirectories
npm run install:all
```

Or install manually:

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Setup Environment Variables

#### Server Environment (.env)

Create `server/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tni-au-health
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

#### Client Environment (.env)

Create `client/.env` file:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Using systemd (Linux)
sudo systemctl start mongod

# Using brew (macOS)
brew services start mongodb-community

# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Seed Database (Optional)

Populate the database with sample data:

```bash
cd server
npx tsx src/utils/seedData.ts
```

This will create:
- 2 users (1 super admin, 1 regular user)
- 10 sample soldiers
- 6 units (air bases)
- 3 notifications

### 6. Start the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

#### Separate Terminals

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

### 8. Login

Use the default credentials:

**Super Admin:**
- Email: `admin@tni-au.mil.id`
- Password: `admin123`

**Regular User:**
- Email: `user@tni-au.mil.id`
- Password: `user123`

## Production Build

### Build Frontend

```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Build Backend

```bash
cd server
npm run build
```

The compiled files will be in `server/dist/`

### Start Production Server

```bash
cd server
npm start
```

## Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

1. Change the port in respective configuration files
2. Update `client/vite.config.ts` proxy settings
3. Update `client/.env` API URL

### MongoDB Connection Error

- Ensure MongoDB is running
- Check the connection string in `server/.env`
- Verify network permissions

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules client/node_modules server/node_modules
rm package-lock.json client/package-lock.json server/package-lock.json
npm run install:all
```

### CORS Issues

- Verify `client/vite.config.ts` proxy settings
- Check CORS configuration in `server/src/server.ts`

## Development Tips

- Use React DevTools for debugging React components
- Use MongoDB Compass for database visualization
- Check browser console for frontend errors
- Check terminal for backend errors
- Activity logs are automatically tracked in the database

## Additional Commands

```bash
# Type check TypeScript
cd server && npx tsc --noEmit
cd client && npx tsc --noEmit

# Format code (if you have Prettier installed)
npx prettier --write "**/*.{ts,tsx,js,jsx,json}"
```

## Support

For issues or questions, please check the main README.md or create an issue in the repository.
