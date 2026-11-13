@echo off
title Seed Softrate Blog Database
color 0B

echo ========================================================
echo   SEEDING SOFTRATE DATABASE WITH CATEGORIES & ARTICLES
echo ========================================================
echo.

cd backend
call npm run seed

echo.
echo ========================================================
echo   SEEDING PROCESS FINISHED!
echo ========================================================
echo.
pause
