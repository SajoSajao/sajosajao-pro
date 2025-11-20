# PM2 Production Deployment Guide

## Prerequisites
```bash
# Install PM2 globally
npm install -g pm2

# Install serve for frontend (static file serving)
npm install -g serve

# Create logs directory
mkdir logs
```

## Environment Setup

### 1. Create Production Environment File
```bash
# Copy and configure production environment
cp .env.example .env.production

# Edit production variables
nano .env.production
```

### 2. Required Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sajosajo_beauty
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
```

## Deployment Commands

### 🚀 Start Production
```bash
# Build the frontend
npm run build

# Start both API and frontend with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list for auto-restart
pm2 save

# Setup PM2 startup script
pm2 startup
```

### 📊 Monitoring
```bash
# View all processes
pm2 list

# Monitor logs
pm2 logs

# Monitor specific app
pm2 logs beauty-academy-api
pm2 logs beauty-academy-frontend

# Monitor in real-time
pm2 monit

# View process details
pm2 show beauty-academy-api
```

### 🔄 Management
```bash
# Restart all apps
pm2 restart all

# Restart specific app
pm2 restart beauty-academy-api

# Reload with zero downtime
pm2 reload all

# Stop all apps
pm2 stop all

# Delete all apps
pm2 delete all
```

### 🔧 Updates & Maintenance
```bash
# Update application
git pull origin main
npm install
npm run build
pm2 reload all

# Or use the deploy script
pm2 deploy production update
```

## Production URLs
- **Frontend:** http://localhost:3000
- **API:** http://localhost:5000
- **Admin Panel:** http://localhost:3000/admin/login
- **API Health:** http://localhost:5000/api/health

## Development URLs (Vite dev server)
- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000  
- **Admin Panel:** http://localhost:5173/admin/login
- **API Health:** http://localhost:5000/api/health

## Security Notes
1. **Change default JWT secret** in production
2. **Use strong MongoDB credentials**
3. **Configure firewall** to allow only necessary ports
4. **Setup SSL/TLS** for HTTPS
5. **Use environment variables** for sensitive data

## Log Files
- Application logs: `./logs/beauty-academy.log`
- Output logs: `./logs/beauty-academy-out.log`
- Error logs: `./logs/beauty-academy-error.log`
- Frontend logs: `./logs/frontend.log`

## Auto-restart Features
- Memory limit: 1GB (API), 500MB (Frontend)
- Auto-restart on crashes
- Cluster mode for API (utilizes all CPU cores)
- Health checks every 30 seconds

## Troubleshooting
```bash
# Check PM2 status
pm2 status

# View detailed logs
pm2 logs --lines 100

# Flush logs
pm2 flush

# Restart with fresh logs
pm2 restart all && pm2 flush
```