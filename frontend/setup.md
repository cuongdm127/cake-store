# 🚀 Frontend Setup Guide - Cake Store

This document describes the setup process for the **Frontend** of the Bake Store project.

---

## ✅ Prerequisites

- Node.js (LTS recommended): https://nodejs.org/
- npm (comes with Node.js)

---

## ✅ Project Setup Steps

### 1. Navigate to the Frontend Folder

```bash
cd frontend
```
### 2. Create a New Next.js Project with TypeScript
```bash
npx create-next-app@latest . --typescript
```
✅ Install Dependencies
### 3. Install Core Dependencies
```bash
npm install react react-dom next
```
### 4. Install TailwindCSS and CLI Dependencies
```bash
npm install -D tailwindcss postcss autoprefixer
npm install -D tailwindcss-cli
```

✅ TailwindCSS Configuration
### 5. Initialize Tailwind Config Files
bash

```bash
npx tailwindcss-cli init -p
```
This creates:
```bash
tailwind.config.js
postcss.config.js
```

### 6. Configure tailwind.config.js
javascript

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 7. Add Global Tailwind Styles
Inside src/styles/globals.css:

css

```bash
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```
Make sure it's imported in _app.tsx:

tsx

```bash
import '../styles/globals.css';
```
✅ Project Folder Structure
ruby

```bash
frontend/
├── src/
│   ├── components/      # UI components (Header, Footer, etc.)
│   ├── pages/           # Next.js pages (index.tsx, about.tsx, etc.)
│   ├── styles/          # CSS files (globals.css)
├── public/              # Static assets (images, icons)
├── .env.local           # Frontend environment variables
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── package.json
```
✅ Environment Variables
Create a .env.local file in frontend/:

dotenv

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_NAME=Bake Store
```
Note: All frontend environment variables must be prefixed with NEXT_PUBLIC_

✅ Running the Frontend
Development Server
bash

```bash
npm run dev
```
App will be available at:
👉 http://localhost:3000
