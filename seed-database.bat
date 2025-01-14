@echo off

REM Navigate to the backend directory
cd backend

REM Run the seed script using ts-node
ts-node "seed.ts"

REM Pause the command prompt to see the output
pause