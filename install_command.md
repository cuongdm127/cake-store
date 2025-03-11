
Install project
✅ Next Steps
# Initialize the Next.js App

## Install Frontend
✅ Step 1: Go to Your Git Repo Root
Make sure you're inside your local cake-store repo directory:
```bash
cd path/to/your/cake-store
```

✅ Step 2: Create the frontend Folder
Create and move into your frontend directory:

```bash
mkdir frontend
cd frontend
```

✅ Step 3: Create a New Next.js Project (Frontend Only)
Inside frontend, run:

```bash
npx create-next-app@latest . --typescript
```
✅ Use . to initialize in the current folder.

Prompts to answer:

ESLint? → Yes (recommended)
Tailwind CSS? → ❌ No (we’ll install it manually for v4 next)
src/ directory? → Yes
app/ router? → No (we’re sticking with Pages Router)
✅ Step 4: Install TailwindCSS v4 in the Frontend Project
```bash
npm install -D tailwindcss@latest @tailwindcss/postcss@latest postcss@latest autoprefixer@latest
```
Then initialize Tailwind:

```bash
npm install -D tailwindcss-cli
npx tailwindcss-cli init -p
```
✅ Step 5: Setup tailwind.config.js
In your frontend/tailwind.config.js, replace with:

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
✅ Step 6: Setup postcss.config.js
In frontend/postcss.config.js:

```bash
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```
✅ Step 7: Create Global Styles in src/styles/globals.css
Replace the contents with:

css
```bash
@import "tailwindcss/preflight";

html, body {
  font-family: system-ui, sans-serif;
}
```
✅ Step 8: Import Global CSS in _app.tsx
In src/pages/_app.tsx, import the styles at the top:

tsx
```bash
import '../styles/globals.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```
✅ Step 9: Test Tailwind in index.tsx
Replace everything in src/pages/index.tsx with:

tsx
Sao chép
Chỉnh sửa
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-red-500 text-white p-4 rounded shadow-lg text-center">
        Frontend is working with TailwindCSS + TypeScript! 🎉
      </div>
    </div>
  );
}
✅ Step 10: Run Your Frontend
bash
Sao chép
Chỉnh sửa
npm run dev
Open http://localhost:3000
```
## Install Backend
```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv mongoose (or pg if you want Postgres)
npm install -D nodemon
```

## Connect Frontend to Backend
```bash
Configure services/api.js (or axios) to call backend routes, e.g., http://localhost:5000/api/products.
Role-Based Routing in Next.js

Create middleware.js for route protection or handle it in _app.tsx.
```
