# 🌐 Production Deployment Guide for SajoSajao.com

## 📋 Overview

This guide will help you deploy your Beauty Academy project to production on **sajosajao.com**.

## ✅ Pre-deployment Checklist

### 1. **Domain & Server Setup**
- [ ] Domain: `sajosajao.com` is registered and pointing to your server
- [ ] SSL Certificate is installed for HTTPS
- [ ] Subdomains configured:
  - `www.sajosajao.com` → Main website
  - `api.sajosajao.com` → Backend API
  - `admin.sajosajao.com` → Admin dashboard (optional)

### 2. **Server Requirements**
- [ ] Ubuntu/CentOS server with root access
- [ ] Node.js 18+ installed
- [ ] MongoDB installed and running
- [ ] PM2 installed globally: `npm install -g pm2`
- [ ] Nginx installed for reverse proxy
- [ ] Git installed

### 3. **Environment Configuration**
- [ ] Production `.env` file configured
- [ ] JWT secrets updated with secure values
- [ ] CORS origins set to your domain
- [ ] MongoDB connection string updated

## 🚀 Deployment Steps

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Clone Repository

```bash
# Clone your project
cd /var/www/
sudo git clone https://github.com/SajoSajao/sajosajao-pro.git sajosajao-beauty-academy
cd sajosajao-beauty-academy

# Set permissions
sudo chown -R $USER:$USER /var/www/sajosajao-beauty-academy
```

### Step 3: Configure Environment

```bash
cd backend-node

# Copy production environment template
cp .env.production .env

# Edit environment file with production values
nano .env
```

**Important Environment Variables to Update:**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/sajosajao_beauty

# Security (Generate new secrets!)
JWT_SECRET=your-super-secure-jwt-secret-here
SESSION_SECRET=your-secure-session-secret-here

# Domain
CORS_ORIGIN=https://sajosajao.com,https://www.sajosajao.com,https://admin.sajosajao.com
DOMAIN=sajosajao.com
API_URL=https://api.sajosajao.com
FRONTEND_URL=https://sajosajao.com

# Environment
NODE_ENV=production
```

### Step 4: Install Dependencies & Run Migrations

```bash
# Backend dependencies
cd backend-node
npm ci --only=production

# Run database migrations
npm run migrate

# Frontend dependencies  
cd ..
npm ci --only=production

# Build frontend
npm run build
```

### Step 5: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/sajosajao.com
```

Add the following configuration:

```nginx
# Main website (Frontend)
server {
    listen 80;
    listen 443 ssl http2;
    server_name sajosajao.com www.sajosajao.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/ssl/cert.pem;
    ssl_certificate_key /path/to/your/ssl/key.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Redirect HTTP to HTTPS
    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }
    
    # Frontend (React app)
    location / {
        root /var/www/sajosajao-beauty-academy/dist;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Admin panel
    location /admin {
        root /var/www/sajosajao-beauty-academy/dist;
        try_files $uri $uri/ /index.html;
    }
}

# API Server
server {
    listen 80;
    listen 443 ssl http2;
    server_name api.sajosajao.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/ssl/cert.pem;
    ssl_certificate_key /path/to/your/ssl/key.pem;
    
    # Redirect HTTP to HTTPS
    if ($scheme != "https") {
        return 301 https://$host$request_uri;
    }
    
    # Proxy to Node.js API
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/sajosajao.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: Start with PM2

```bash
cd /var/www/sajosajao-beauty-academy

# Start with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command output instructions
```

### Step 7: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d sajosajao.com -d www.sajosajao.com -d api.sajosajao.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 📊 Monitoring & Maintenance

### PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart all

# Reload with zero downtime
pm2 reload all

# Stop application
pm2 stop all
```

### Database Backups

```bash
# Create backup script
sudo nano /home/deploy/backup-mongodb.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
mongodump --host localhost --port 27017 --db sajosajao_beauty --out $BACKUP_DIR/backup_$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $BACKUP_DIR backup_$DATE
rm -rf $BACKUP_DIR/backup_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/backup_$DATE.tar.gz"
```

```bash
# Make executable
chmod +x /home/deploy/backup-mongodb.sh

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /home/deploy/backup-mongodb.sh
```

## 🔐 Security Checklist

- [ ] **JWT Secrets**: Generated secure random strings
- [ ] **Database**: MongoDB authentication enabled
- [ ] **Firewall**: Only necessary ports open (80, 443, 22)
- [ ] **SSL**: HTTPS enforced with valid certificates
- [ ] **Updates**: Server regularly updated
- [ ] **Backups**: Automated database backups configured
- [ ] **Rate Limiting**: Enabled in production
- [ ] **Admin Password**: Changed from default

## 🌐 URLs After Deployment

- **Main Website**: https://sajosajao.com
- **Admin Panel**: https://sajosajao.com/admin/login
- **API Health Check**: https://api.sajosajao.com/api/health

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   sudo lsof -i :5000
   sudo kill -9 <PID>
   ```

2. **MongoDB Connection Failed**
   ```bash
   sudo systemctl status mongod
   sudo systemctl start mongod
   ```

3. **Nginx Configuration Error**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

4. **SSL Certificate Issues**
   ```bash
   sudo certbot certificates
   sudo certbot renew
   ```

## 🎉 Post-Deployment Tasks

1. **Test all functionality**:
   - [ ] Homepage loads correctly
   - [ ] Contact forms work
   - [ ] Admin login works
   - [ ] User management functions

2. **Update DNS** (if needed):
   - [ ] A records point to server IP
   - [ ] CNAME records configured for subdomains

3. **Monitor performance**:
   - [ ] Set up monitoring tools
   - [ ] Configure log rotation
   - [ ] Set up alerting

4. **Change default passwords**:
   - [ ] Admin user: `admin` / `admin123`
   - [ ] Custom admin: `shreegajeshji` / `#1ShreeGajeshJi`

## 📞 Support

Your Beauty Academy application is now live at **https://sajosajao.com**! 🎉

For ongoing maintenance and support, monitor the application regularly and keep all dependencies updated.