@echo off
title Softrate Tech Blog - 1-Click Startup
color 0A

echo ========================================================
echo       SOFTRATE TECH PUBLICATION - 1-CLICK RUNNER
echo ========================================================
echo.

:: 1. Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b
)

:: 2. Check Backend node_modules
if not exist "backend\node_modules" (
    echo [1/3] Installing Backend Dependencies (first-time only)...
    cd backend
    call npm install
    cd ..
) else (
    echo [1/3] Backend dependencies already installed.
)

:: 3. Check Frontend node_modules
if not exist "frontend\node_modules" (
    echo [2/3] Installing Frontend Dependencies (first-time only)...
    cd frontend
    call npm install
    cd ..
) else (
    echo [2/3] Frontend dependencies already installed.
)

echo [3/3] Starting Backend and Frontend Servers...
echo.

:: Start Backend in a separate window
start "Technology Blog - Backend API (Port 5000)" cmd /k "cd backend && npm run dev"

:: Start Frontend in a separate window
start "Technology Blog - Frontend UI (Port 5173)" cmd /k "cd frontend && npm run dev"

echo ========================================================
echo   SERVERS STARTED SUCCESSFULLY!
echo ========================================================
echo.
echo   * Public Blog:   http://localhost:5173
echo   * Admin Login:   http://localhost:5173/admin/login
echo   * Admin Email:   sekarrithi4@gmail.com
echo   * Password:      Rithika2005
echo.
echo Opening your browser now in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo Keep this window open, or close it whenever you want.
pause
