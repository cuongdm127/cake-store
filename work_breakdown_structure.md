# 🍰 Cake Store Project - Work Breakdown Structure (WBS)
## 1. Frontend (Customer)
```
Task	Status
Setup Next.js + TailwindCSS (Page Router)	✅
Global layout (Header/Footer)	✅
Homepage (Hero, Featured products)	✅
Products List Page with pagination	✅
Product Detail Page (optional)	⬜️
Cart Page	✅
Cart Context + State Management	✅
Persist Cart in DB (when logged in)	✅
Checkout Page (Cash on Delivery)	✅
Order History Page (User orders)	✅
Order Details Page	✅
Multi-language Support (English/Vietnamese)	⬜️
Responsive UI polishing	⬜️
```
## 2. Frontend (Admin Panel)
```
Task	Status
Admin Dashboard Layout	✅
Admin Authentication Guard (Role-based access)	✅
Admin Product List Page	✅
Admin Product Create/Edit/Delete Pages	⬜️ (Product List Done)
Admin Orders Management	⬜️
Admin Users Management	⬜️
Pagination for Admin Orders/Products	⬜️
File Upload (Product Images)	⬜️
Notification/Toast (react-toastify)	⬜️
```
## 3. Backend (Node.js + Express + MongoDB)
```
Task	Status
Setup Node.js/Express Project	✅
MongoDB Connection (dotenv, Mongoose)	✅
User Registration/Login (JWT Auth)	✅
User Profile (Get/Update)	✅
Role-based Access Control Middleware	✅
Products CRUD (Admin)	✅
Orders CRUD	✅
Cart Model + Sync with Frontend	✅
Checkout + Create Order (Cash on Delivery)	✅
User Orders (Get My Orders, Order Details)	✅
Admin Orders/Users CRUD APIs	✅
Pagination & Filtering on APIs	⬜️
Upload Images API (for Products)	⬜️
```
## 4. Infrastructure / DevOps / Miscellaneous
```
Task	Status
GitHub Repo Setup (frontend & backend)	✅
Environment Variables Management (.env)	✅
Project Documentation (SETUP.md)	✅
Deployment (Optional: Vercel/Render/Mongo Atlas)	⬜️
Docker Support (Optional)	⬜️
```
## ✅ Completed So Far (Highlights)
```
Frontend customer flow up to checkout and orders.
Admin Product Management (Listing + Role-Based Guarding).
Backend fully supporting products, orders, user auth, cart persistence.
Clean code structure and documentation.
```
# 🚀 What's Next (Suggestions)
## Short Term (Admin Panel)
```
Admin Product Create/Edit Pages
Admin Order & User Management
Pagination on Admin Tables
Image Upload for Products (Multer or Cloudinary)
```
## Medium Term
```
Multi-language switcher & content
UX/UI polishing (animations, transitions, spinners)
Toast Notifications for all actions (react-toastify)
```
## Long Term (Optional)
```
Payment Integration (Stripe/PayPal)
Deployment (Vercel/Render)
SEO (Meta Tags, OpenGraph)
PWA/Service Worker Support
```
