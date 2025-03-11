import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('Bake Store API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
