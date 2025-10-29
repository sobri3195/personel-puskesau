# Deployment Guide

This guide covers deploying the TNI AU Health Dashboard to production.

## Prerequisites

- Server with Node.js 18+ installed
- MongoDB instance (local or cloud like MongoDB Atlas)
- Domain name (optional)
- SSL certificate (recommended)

## Deployment Options

### Option 1: Traditional Server Deployment

#### 1. Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (or use MongoDB Atlas)
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2 for process management
sudo npm install -g pm2
```

#### 2. Clone and Setup

```bash
# Clone repository
git clone <your-repo-url>
cd tni-au-health-dashboard

# Install dependencies
npm run install:all

# Setup environment variables
cp server/.env.example server/.env
nano server/.env  # Edit with production values

# Build frontend
cd client
npm run build

# Seed database (first time only)
cd ../server
npx tsx src/utils/seedData.ts
```

#### 3. Configure Production Environment

**server/.env:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tni-au-health-production
JWT_SECRET=<generate-strong-random-secret>
NODE_ENV=production
```

#### 4. Build Backend

```bash
cd server
npm run build
```

#### 5. Setup PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'tni-au-backend',
    script: './dist/server.js',
    cwd: './server',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Start with PM2:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 6. Setup Nginx

```bash
sudo apt install nginx

# Create nginx configuration
sudo nano /etc/nginx/sites-available/tni-au-health
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/tni-au-health-dashboard/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/tni-au-health /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 7. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 2: Docker Deployment

#### 1. Create Dockerfiles

**server/Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

**client/Dockerfile:**

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=tni-au-health

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/tni-au-health
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### 2. Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 3: Cloud Platforms

#### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create apps
heroku create tni-au-backend
heroku create tni-au-frontend

# Add MongoDB
heroku addons:create mongolab:sandbox -a tni-au-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret -a tni-au-backend

# Deploy backend
cd server
git push heroku main

# Deploy frontend
cd ../client
# Update VITE_API_URL to backend URL
npm run build
# Deploy to static hosting or Heroku
```

#### AWS (EC2 + MongoDB Atlas)

1. Launch EC2 instance
2. Follow Traditional Server Deployment steps
3. Setup MongoDB Atlas
4. Update MONGODB_URI to Atlas connection string
5. Configure security groups
6. Setup Elastic IP

#### DigitalOcean

1. Create Droplet
2. Follow Traditional Server Deployment steps
3. Setup managed MongoDB
4. Configure firewall

## Post-Deployment Checklist

- [ ] Verify all API endpoints are working
- [ ] Test login functionality
- [ ] Check database connection
- [ ] Verify CRUD operations
- [ ] Test file uploads/exports
- [ ] Check responsive design on mobile
- [ ] Verify SSL certificate
- [ ] Setup monitoring (PM2 or other)
- [ ] Configure automated backups
- [ ] Setup log rotation
- [ ] Test error handling
- [ ] Verify environment variables
- [ ] Check CORS settings

## Monitoring

### PM2 Monitoring

```bash
# View status
pm2 status

# View logs
pm2 logs

# Monitor
pm2 monit

# Restart
pm2 restart all
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### MongoDB Monitoring

```bash
# Connect to MongoDB
mongosh

# Check database stats
use tni-au-health
db.stats()
```

## Backup Strategy

### Database Backup

```bash
# Create backup script
nano /home/user/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --db tni-au-health --out /backups/mongodb_$DATE
find /backups -mtime +7 -delete  # Delete backups older than 7 days
```

```bash
chmod +x /home/user/backup.sh

# Setup cron job
crontab -e
# Add: 0 2 * * * /home/user/backup.sh
```

## Security Hardening

1. **Change default ports**
2. **Setup firewall (UFW)**
   ```bash
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   ```
3. **Disable root login**
4. **Setup fail2ban**
5. **Regular security updates**
6. **Strong JWT secret**
7. **Rate limiting (if needed)**
8. **Regular security audits**

## Performance Optimization

1. **Enable Gzip in Nginx**
2. **Setup CDN for static assets**
3. **Implement caching**
4. **Database indexing**
5. **Connection pooling**
6. **Load balancing (if needed)**

## Troubleshooting

### Backend not starting
- Check PM2 logs: `pm2 logs`
- Verify MongoDB is running
- Check environment variables
- Verify port availability

### Frontend not loading
- Check Nginx configuration
- Verify build files exist
- Check browser console
- Verify API URL

### Database connection issues
- Check MongoDB is running
- Verify connection string
- Check network/firewall
- Verify credentials

## Maintenance

### Update Application

```bash
# Pull latest changes
git pull

# Update dependencies
npm run install:all

# Rebuild
cd client && npm run build
cd ../server && npm run build

# Restart PM2
pm2 restart all
```

### Database Maintenance

```bash
# Compact database
use tni-au-health
db.runCommand({ compact: 'collection_name' })

# Rebuild indexes
db.collection.reIndex()
```

## Support

For deployment issues:
1. Check logs first
2. Review documentation
3. Contact system administrator
4. Create issue in repository

## Environment Variables Reference

### Production Server
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tni-au-health-production
JWT_SECRET=<strong-random-secret-min-32-chars>
NODE_ENV=production
```

### Production Client
```env
VITE_API_URL=https://your-domain.com
```

## Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [MongoDB Production Notes](https://docs.mongodb.com/manual/administration/production-notes/)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
