```bash
/bake-store                     # Monorepo root
├── /frontend                   # Next.js + Tailwind CSS + i18n (English/Vietnamese)
│   ├── /public
│   │   ├── /locales            # Translation files for each supported language
│   │   │   ├── en
│   │   │   │   └── common.json
│   │   │   └── vi
│   │   │       └── common.json
│   │   └── /assets             # Images, icons, etc. (logo, banners, etc.)
│   │
│   ├── /src
│   │   ├── /components
│   │   │   ├── common          # Buttons, Inputs, etc. (shared UI components)
│   │   │   ├── layout          # Header, Footer, Navbar, LanguageSwitcher
│   │   │   ├── product         # ProductCard, ProductList, etc.
│   │   │   ├── cart            # CartItem, CartSummary
│   │   │   └── admin           # Admin-specific components (AdminSidebar, AdminTable)
│   │   │
│   │   ├── /features
│   │   │   ├── customer        # Customer-facing pages/modules (Home, Shop, Checkout)
│   │   │   └── admin           # Admin dashboard pages/modules (Dashboard, Orders)
│   │   │
│   │   ├── /hooks              # Custom React hooks (useAuth, useCart, useLocale, etc.)
│   │   ├── /layouts            # Layouts for different areas (MainLayout, AdminLayout)
│   │   ├── /pages              # Next.js pages & routing (auto-routes)
│   │   │   ├── index.tsx       # Home page
│   │   │   ├── products        # /products, /products/[slug].tsx
│   │   │   ├── cart.tsx        # Shopping cart page
│   │   │   ├── checkout.tsx    # Checkout page
│   │   │   ├── admin           # Admin routes (protected)
│   │   │   │   ├── index.tsx   # Admin dashboard home
│   │   │   │   ├── products.tsx
│   │   │   │   ├── orders.tsx
│   │   │   └── api             # (Optional) Next.js API routes (if using Next backend APIs)
│   │   │
│   │   ├── /services           # API calls (Axios/fetch to backend API)
│   │   ├── /store              # (Optional) Global state management (Redux/Zustand/Context)
│   │   ├── /styles             # Tailwind CSS globals + component styles
│   │   ├── /types              # TypeScript types/interfaces (Product, User, Order)
│   │   └── /utils              # Utility functions (formatCurrency, etc.)
│   │
│   ├── next.config.js          # Next.js config (with i18n routing)
│   ├── next-i18next.config.js  # next-i18next i18n configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS config
│   └── package.json
│
├── /backend                    # Node.js + Express API (REST or GraphQL)
│   ├── /src
│   │   ├── /controllers        # Controller logic (productController, orderController)
│   │   ├── /models             # DB models (Product, User, Order)
│   │   ├── /routes             # Express routes (productRoutes, userRoutes)
│   │   ├── /middlewares        # Middlewares (auth, error handling)
│   │   ├── /services           # Business logic (paymentService, mailService)
│   │   ├── /utils              # Utility functions (validators, helpers)
│   │   ├── /config             # DB connection config, environment setup
│   │   └── server.js           # Express server entry point
│   │
│   ├── .env                    # Backend environment variables (DB_URI, PORT, etc.)
│   ├── package.json
│   └── README.md
│
├── /shared                    # (Optional, for future use)
│   ├── /types                  # Shared TypeScript types (Product, User)
│   └── /utils                  # Shared utility functions (validators, helpers)
│
├── docker-compose.yml          # (Optional) Docker for backend, frontend, and DB in dev
├── package.json                # Root scripts (optional monorepo/workspaces)
├── .gitignore
└── README.md
```
