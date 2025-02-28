# E-commerce Website Project Plan

## 1. High-Level Architecture

Your application can have **two distinct parts**, each with its own set of user interfaces and endpoints:

### 1.1 Admin Site (Back Office)

**Features:**
- **Product Management**: Create, read, update, delete (CRUD) products.
- **User Management**: View and manage users, assign roles (like admin, standard user), ban/unban, etc.
- **Order Management**: Track orders, update statuses (e.g., Processing, Shipped, Delivered).
- **Content Management**: Edit homepage banners, manage categories, or post announcements.
- **Payment & Refund Management**: Review payments, issue refunds.
- **Analytics (Optional)**: Sales reports, best-selling products, user growth, etc.

### 1.2 Customer Site (Storefront)

**Features:**
- **Product Browsing**: List products, apply filters/sorting, view categories.
- **Product Details**: Show images, descriptions, prices, reviews.
- **Cart & Checkout**: Add to cart, remove items, adjust quantities, proceed with checkout.
- **Payment Integration**: Integrate Stripe, PayPal, or other gateways.
- **User Account**: Manage profile, addresses, view order history.
- **Customer Support**: Contact forms, FAQs, or chat (optional).

---

## 2. Considerations for Admin vs. Customer Sites

### Option A: Single Front-End with Role-Based Access
- Use React (or any front-end framework) and create admin routes (e.g., `/admin`) that only admins can access.
- Based on the user’s role (admin vs. customer), show or hide certain pages/features.

### Option B: Separate Front-Ends
- One front end purely for customers (the storefront).
- Another front end specifically for admin tasks.
- Useful if you want very different UIs or distinct deployment for each.

> **Note**: Most small-to-medium projects use **Option A** (a single front-end) with role-based authentication.

---

## 3. Database Design

You can use **relational databases** (e.g., PostgreSQL, MySQL) or **document databases** (e.g., MongoDB). The main entities will be similar. Below is a **relational-style** example, but adapt as needed.

### 3.1 Users

**Table/Collection**: `users`

- **Fields**:
  - `id` (primary key)
  - `email` (unique)
  - `passwordHash` (hashed password)
  - `role` (e.g., `admin`, `customer`)
  - `name` (optional: `firstName`, `lastName`)
  - `createdAt`, `updatedAt` (timestamps)

**Relationships**:
- A user can have multiple orders (**One-to-Many**).
- If `role` is `admin`, they can manage products, orders, etc.

### 3.2 Products (Cakes)

**Table/Collection**: `products`

- **Fields**:
  - `id` (primary key)
  - `name`
  - `description`
  - `price`
  - `imageUrl` (or an array if multiple images)
  - `stock` (number of items available)
  - `categoryId` (if using categories)
  - `createdAt`, `updatedAt`

**Relationships**:
- Many products can belong to one category.
- Products appear in many orders (requires a **junction table** or embedded array in MongoDB).

### 3.3 Categories (Optional)

**Table/Collection**: `categories`

- **Fields**:
  - `id` (primary key)
  - `name` (e.g., "Chocolate Cakes", "Vegan Cakes")
  - `description`
  - `createdAt`, `updatedAt`

**Relationships**:
- One category can have many products.

### 3.4 Orders

**Table/Collection**: `orders`

- **Fields**:
  - `id` (primary key)
  - `userId` (the customer placing the order)
  - `totalPrice`
  - `status` (e.g., `Pending`, `Processing`, `Shipped`, `Delivered`)
  - `paymentStatus` (e.g., `Paid`, `Refunded`, `Failed`)
  - `createdAt`, `updatedAt`

**Relationships**:
- One order belongs to one user.
- One order has many order items.

### 3.5 Order Items (Relational DB Example)

**Table**: `orderItems`

- **Fields**:
  - `id` (primary key)
  - `orderId`
  - `productId`
  - `quantity`
  - `priceAtPurchase` (product price at time of purchase)

> In MongoDB or other document DBs, you can embed `orderItems` inside the `orders` collection.

### 3.6 Payments (Optional)

If you want to store payment details locally:

- **Fields**:
  - `id`
  - `orderId`
  - `paymentMethod` (e.g., Credit Card, PayPal)
  - `amount`
  - `paymentDate`
  - `transactionId` (from Stripe/PayPal)
  - `status` (e.g., Completed, Refunded)

Some teams rely on external systems (e.g., Stripe) and store only a reference to the transaction.

---

## 4. Admin Features & UI Flow

1. **Manage Products**  
   - List products (show stock info).  
   - Create new product entries.  
   - Update existing products.  
   - Delete discontinued products.

2. **Manage Users**  
   - View all users (roles, status).  
   - Change roles (promote user to admin or demote to customer).  
   - Ban/unban if violating policies.

3. **Manage Orders**  
   - Track order status (Pending → Processing → Shipped → Delivered).  
   - Issue refunds (mark refunded, trigger payment processor refund).  
   - View order details (products, shipping, etc.).

4. **Content Management**  
   - Edit banners or promotions on the homepage.  
   - (Optional) Manage blog/news articles.

5. **Analytics Dashboard (Optional)**  
   - Sales over time, best-selling products, user signups.  
   - Helps with inventory and marketing decisions.

---

## 5. Customer Site Features & UI Flow

1. **Home Page**  
   - Featured products, promotional banners.

2. **Product Listing Page**  
   - Browse products, filters (categories, price range), search bar (optional).

3. **Product Details Page**  
   - Images (carousel), description, price, reviews.  
   - "Add to Cart" button.

4. **Cart & Checkout**  
   - View cart items, adjust quantities, remove items.  
   - Checkout with shipping information, payment details.

5. **Payment & Order Confirmation**  
   - Integrate with Stripe, PayPal, or other gateways.  
   - Display final order summary, email confirmation.

6. **User Account**  
   - Profile management (name, password, addresses).  
   - Order history (past purchases, statuses).

---

## 6. Security and Role Management

1. **Authentication**  
   - Use JWT or session-based auth.  
   - On login, generate a token that includes the user’s role.

2. **Authorization**  
   - Middleware checks the user’s role before allowing admin-only actions.

3. **Validation**  
   - Validate inputs on both front end and back end.  
   - Prevent invalid data (e.g., negative prices, missing fields).

---

## 7. Next Steps

1. **Finalize the Database Schema**  
   - Decide on relational vs. non-relational.  
   - Adjust fields or tables for your specific needs.

2. **Draw ER Diagrams**  
   - Visually map users, products, orders, etc.

3. **Plan Admin & Customer Routes**  
   - For Express, define routes like `/api/admin/products`, `/api/orders`.  
   - For customers, define `/api/products`, `/api/cart`, `/api/checkout`.

4. **Set Up Auth**  
   - Choose a strategy (Passport.js, JWT) and how tokens are stored (cookies vs. localStorage).

5. **Plan an MVP**  
   - Start with essential features (product browsing, cart, checkout).  
   - Add admin management and advanced features later.

---

## Key Takeaways
- **Two Parts**: An admin interface for internal management and a customer-facing storefront.  
- **Database Planning**: Identify the main entities (users, products, orders) and how they relate.  
- **Role-Based Access**: Secure admin pages so only authorized users can manage the system.  
- **Incremental Development**: Start small with a functional MVP; expand to add admin and advanced features over time.

