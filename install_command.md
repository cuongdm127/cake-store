
Install project
✅ Next Steps
# Initialize the Next.js App

## Install Frontend
```bash
npx create-next-app@latest frontend
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install next-i18next react-i18next i18next

Configure Tailwind in tailwind.config.js and add the global styles.
Create next-i18next.config.js
At the root of your frontend folder:
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi'],
  },
};

Update next.config.js
Import and add the i18n config:
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
};

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
