import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../config/db';
import Product from '../models/Product';

// Sample products data
const products = [
  {
    name: 'Chocolate Fudge Cake',
    description: 'Rich chocolate cake with fudge topping.',
    price: 20,
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb',
  },
  {
    name: 'Strawberry Shortcake',
    description: 'Layers of fresh strawberries and whipped cream.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1542925305-2eb9c9b36c38',
  },
  {
    name: 'Vanilla Sponge Cake',
    description: 'Soft and fluffy vanilla sponge cake.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1599785209707-28d6eb9c5b9d',
  },
];

// Seed function
const importData = async () => {
  try {
    await connectDB();

    // Clear the collection first (optional)
    await Product.deleteMany();

    // Insert sample data
    const createdProducts = await Product.insertMany(products);

    console.log(`✅ Successfully imported ${createdProducts.length} products!`);
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
