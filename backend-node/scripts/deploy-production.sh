#!/bin/bash

# Production Deployment Script for SajoSajao.com
# This script sets up the Beauty Academy project for production deployment

echo "🚀 Starting SajoSajao.com Production Deployment"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the backend-node directory."
    exit 1
fi

# 1. Environment Setup
echo "📋 Setting up production environment..."
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from template..."
    cp .env.production .env
    echo "📝 Please edit .env with your production values before continuing."
    exit 1
fi

# 2. Install Dependencies
echo "📦 Installing production dependencies..."
npm ci --only=production

# 3. Run Database Migrations
echo "🗄️  Running database migrations..."
npm run migrate

# 4. Build Assets (if needed)
echo "🔨 Building application..."
# Add any build steps here if needed

# 5. Start with PM2
echo "🚀 Starting application with PM2..."
npm run pm2:start

# 6. Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# 7. Setup PM2 startup
echo "🔧 Setting up PM2 startup script..."
pm2 startup

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "🌐 Your application should now be running on:"
echo "   - API: https://api.sajosajao.com"
echo "   - Frontend: https://sajosajao.com"
echo "   - Admin: https://admin.sajosajao.com"
echo ""
echo "📊 To monitor your application:"
echo "   pm2 status          - Check application status"
echo "   pm2 logs            - View logs"
echo "   pm2 monit           - Real-time monitoring"
echo "   pm2 restart all     - Restart all services"
echo ""
echo "🔐 Default Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo "   ⚠️  CHANGE THESE IMMEDIATELY AFTER FIRST LOGIN!"
echo ""