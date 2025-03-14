import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import connectDB from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('Bake Store API is running!');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
