@echo off
REM Production Deployment Script for SajoSajao.com (Windows)
REM This script sets up the Beauty Academy project for production deployment

echo 🚀 Starting SajoSajao.com Production Deployment
echo ==============================================

REM Check if we're in the right directory
if not exist package.json (
    echo ❌ Error: package.json not found. Please run this script from the backend-node directory.
    exit /b 1
)

REM 1. Environment Setup
echo 📋 Setting up production environment...
if not exist .env (
    echo ⚠️  No .env file found. Copying from template...
    copy .env.production .env
    echo 📝 Please edit .env with your production values before continuing.
    pause
    exit /b 1
)

REM 2. Install Dependencies
echo 📦 Installing production dependencies...
call npm ci --only=production

REM 3. Run Database Migrations
echo 🗄️  Running database migrations...
call npm run migrate

REM 4. Start with PM2
echo 🚀 Starting application with PM2...
call npm run pm2:start

REM 5. Save PM2 configuration
echo 💾 Saving PM2 configuration...
call pm2 save

echo.
echo ✅ Deployment completed successfully!
echo.
echo 🌐 Your application should now be running on:
echo    - API: https://api.sajosajao.com
echo    - Frontend: https://sajosajao.com
echo    - Admin: https://admin.sajosajao.com
echo.
echo 📊 To monitor your application:
echo    pm2 status          - Check application status
echo    pm2 logs            - View logs
echo    pm2 monit           - Real-time monitoring
echo    pm2 restart all     - Restart all services
echo.
echo 🔐 Default Admin Credentials:
echo    Username: admin
echo    Password: admin123
echo    ⚠️  CHANGE THESE IMMEDIATELY AFTER FIRST LOGIN!
echo.
pause