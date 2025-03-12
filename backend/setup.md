# ✅ `backend/SETUP.md`

# 🚀 Backend Setup Guide - Bake Store

This document describes the setup process for the **Backend** of the Bake Store project.

---

## ✅ Prerequisites

- Node.js (LTS recommended): https://nodejs.org/
- npm (comes with Node.js)
- MongoDB (Local or Atlas): https://www.mongodb.com/

---

## ✅ Project Setup Steps

### 1. Navigate to the Backend Folder

```bash
cd backend
```
### 2. Initialize a New Node.js Project
```bash
npm init -y
```
✅ Install Dependencies
### 3. Install Core Dependencies
```bash
npm install express cors mongoose dotenv
```
### 4. Install Dev Dependencies
```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/mongoose
```
✅ TypeScript Configuration
### 5. Initialize TypeScript Configuration
```bash
npx tsc --init
```
Recommended tsconfig.json settings:

json

```bash
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```
✅ Project Folder Structure
```bash
backend/
├── src/
│   ├── config/         # Database connection (db.ts)
│   ├── controllers/    # Business logic (e.g., productController.ts)
│   ├── models/         # Mongoose schemas/models (e.g., Product.ts)
│   ├── routes/         # Express routes (e.g., productRoutes.ts)
│   ├── app.ts          # Express server entry point
├── .env                # Environment variables
├── package.json
├── tsconfig.json
├── .gitignore
```
✅ Environment Variables
Create a .env file in backend/:

dotenv

```bash
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/bake-store
NODE_ENV=development
```
✅ .gitignore
```bash
# Node modules
node_modules/

# Build output
dist/

# Environment files
.env
```
✅ Package.json Scripts
Add the following scripts inside package.json:

json

```bash
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js"
}
```
✅ MongoDB Connection Setup
Create a src/config/db.ts file
Use MONGO_URI from .env to connect with Mongoose
(See code examples in the controller files)
✅ Running the Backend
Development Server
```bash
npm run dev
```
Backend API will run at:
👉 http://localhost:5001
