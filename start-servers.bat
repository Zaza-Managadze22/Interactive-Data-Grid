@echo off
REM Change to the backend directory and start the backend server
cd /d "%~dp0backend"
start cmd /k "npm run serve"

REM Change to the frontend directory and start the frontend server
cd /d "%~dp0frontend"
start cmd /k "npm run dev"

REM Close the command prompt window
exit