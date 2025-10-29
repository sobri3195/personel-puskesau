# Quick Start Guide

Get the TNI AU Health Dashboard up and running in 5 minutes!

## Prerequisites

Make sure you have installed:
- Node.js (v18+)
- MongoDB (v6+)
- npm

## Installation

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start MongoDB
# Linux
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 3. Setup environment variables
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Seed the database with sample data
cd server
npx tsx src/utils/seedData.ts
cd ..

# 5. Start the application
npm run dev
```

## Access

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Login

Use these default credentials:

**Super Admin:**
- Email: `admin@tni-au.mil.id`
- Password: `admin123`

**Regular User:**
- Email: `user@tni-au.mil.id`
- Password: `user123`

## What's Next?

1. **Explore the Dashboard**: View statistics and charts
2. **Manage Soldiers**: Add, edit, or delete soldier records
3. **View Map**: See personnel distribution across Indonesia
4. **Check Notifications**: Review system notifications
5. **View Activity Logs**: Monitor all system activities

For more detailed information:
- [Setup Guide](SETUP.md) - Detailed installation and configuration
- [API Documentation](API.md) - Complete API reference
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## Common Issues

### MongoDB Not Running
```bash
# Check if MongoDB is running
mongosh

# If not, start it
sudo systemctl start mongod
```

### Port Already in Use
If port 3000 or 5000 is in use, update the ports in:
- `server/.env` (change PORT)
- `client/vite.config.ts` (change server.port)

### Dependencies Error
```bash
# Clean reinstall
rm -rf node_modules client/node_modules server/node_modules
npm run install:all
```

## Need Help?

Check the documentation:
- [README.md](README.md) - Overview and features
- [SETUP.md](SETUP.md) - Detailed setup guide
- [API.md](API.md) - API documentation

Happy coding! 🚀
