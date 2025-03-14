import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import adminProductRoutes from './routes/admin/adminProductRoutes';
import adminOrderRoutes from './routes/admin/adminOrderRoutes';
import adminUserRoutes from './routes/admin/adminUserRoutes';
import adminAnalyticsRoutes from './routes/admin/adminAnalyticsRoutes';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.use('/api/admin/analytics', adminAnalyticsRoutes);


// Root route
app.get('/', (_req, res) => {
  res.send('Bake Store API is running!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
