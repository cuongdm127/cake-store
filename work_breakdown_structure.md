# 📝 Work Breakdown Structure (WBS)
### Project: Bake Store E-Commerce Website
### Frontend: Next.js + TailwindCSS + TypeScript
### Backend: Node.js + Express + MongoDB + TypeScript

## 1. Project Initialization
### 1.1 Frontend Setup
* 1.1.1 Initialize Next.js with TypeScript ✅
* 1.1.2 Install and configure TailwindCSS ✅
* 1.1.3 Setup global styles (globals.css) ✅
* 1.1.4 Setup environment variables (.env.local) ✅
* 1.1.5 Setup i18n framework (next-i18next) ✅
* 1.1.6 Project folder structure (components, pages, styles) ✅
### 1.2 Backend Setup
* 1.2.1 Initialize Node.js with TypeScript ✅
* 1.2.2 Install Express, Mongoose, dotenv, cors ✅
* 1.2.3 Configure TypeScript (tsconfig.json) ✅
* 1.2.4 Setup project structure (controllers, routes, models) ✅
* 1.2.5 Setup MongoDB connection (connectDB()) ✅
* 1.2.6 Setup environment variables (.env) ✅
## 2. Core Features Development
### 2.1 Product Management
#### 2.1.1 Backend
* 2.1.1.1 Define Product Model (Mongoose Schema) ✅
* 2.1.1.2 Create CRUD API routes:
  * GET /api/products (list products) ✅
  * GET /api/products/:id (product detail) ✅
  * POST /api/products (create product) ✅
  * PUT /api/products/:id (update product) ✅
  * DELETE /api/products/:id (delete product) ✅
* 2.1.1.3 Seed sample product data ✅
#### 2.1.2 Frontend
* 2.1.2.1 Fetch products from backend API
* 2.1.2.2 Display product list page ✅
* 2.1.2.3 Display product detail page ✅
* 2.1.2.4 Create Add to Cart button (basic) ✅
### 2.2 Cart & Checkout System
#### 2.2.1 Frontend
* 2.2.1.1 Create Cart Context/State (React Context) ✅
* 2.2.1.2 Cart Button (show item count) ✅
* 2.2.1.3 Cart Page (list items, quantity update, remove item) ✅
* 2.2.1.4 Checkout Form (shipping info)
#### 2.2.2 Backend
* 2.2.2.1 Define Order Model
* 2.2.2.2 Create API routes for Orders (CRUD):
  * POST /api/orders (create order)
  * GET /api/orders/:id (view order)
  * GET /api/orders/user/:userId (list user orders)
### 2.3 User Authentication & Authorization
#### 2.3.1 Backend
* 2.3.1.1 Define User Model
* 2.3.1.2 Register & Login API (JWT-based auth)
* 2.3.1.3 Protect admin routes (CRUD products, orders)
* 2.3.1.4 Password hashing with bcrypt
#### 2.3.2 Frontend
* 2.3.2.1 Login & Register pages
* 2.3.2.2 Manage user sessions (JWT storage)
* 2.3.2.3 Restrict access to Admin Dashboard
* 2.3.2.4 Show user profile and order history
## 3. Admin Dashboard
### 3.1 Backend
#### 3.1.1 Protect admin APIs (JWT + Role-based auth)
### 3.2 Frontend
#### 3.2.1 Create Admin Dashboard Layout
#### 3.2.2 Product Management UI (CRUD operations)
#### 3.2.3 Order Management UI (view, update order status)
#### 3.2.4 User Management UI (list users, change roles)
## 4. UI/UX and Styling Enhancements
### 4.1 Responsive Layouts (Mobile/Desktop)
### 4.2 Home Page (Hero banner, featured products, categories)
### 4.3 Add Language Switcher (English/Vietnamese i18n)
### 4.4 Footer & Header Components
### 4.5 Toast Notifications (success/error messages)
## 5. Analytics and Reporting (Admin)
### 5.1 Sales Reports (daily/weekly/monthly revenue)
### 5.2 Product Sales Summary (best sellers)
### 5.3 User Signups Report
## 6. Payment Integration
### 6.1 Stripe / PayPal Payment Gateway
### 6.2 Payment success/failure handling
### 6.3 Update order payment status
### 6.4 Send order confirmation email (optional)
## 7. Testing and Validation
### 7.1 Backend API Testing (Postman)
### 7.2 Unit Tests (Jest for backend)
### 7.3 Frontend Component Testing (React Testing Library)
### 7.4 Form Validation (Frontend + Backend)
## 8. Deployment
### 8.1 Backend deployment (Render/Heroku)
### 8.2 MongoDB Atlas setup
### 8.3 Frontend deployment (Vercel/Netlify)
### 8.4 Configure environment variables (production)
### 8.5 Setup CI/CD pipelines (optional)
