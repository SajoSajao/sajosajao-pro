@echo off
echo ================================================
echo   SajoSajao Beauty Academy - Setup Script
echo ================================================
echo.

REM Check Node.js version
echo Checking Node.js version...
node --version
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js 20+ from: https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install dependencies
    echo This usually means Node.js version is too old
    echo Required: v20.19+ or v22.12+
    echo.
    pause
    exit /b 1
)

echo.
echo ================================================
echo   Setup Complete! 
echo ================================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Or run: start-dev.bat
echo.
pause
