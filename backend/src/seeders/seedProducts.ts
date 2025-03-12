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
    image: 'https://static.vecteezy.com/system/resources/thumbnails/053/190/619/small/gourmet-berry-chocolate-cake-on-elegant-table-setting-free-photo.jpg',
  },
  {
    name: 'Strawberry Shortcake',
    description: 'Layers of fresh strawberries and whipped cream.',
    price: 18,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynJ0YZfnTBokj3ENuMe1E9HkAq2-ZIuD_Zg&s',
  },
  {
    name: 'Vanilla Sponge Cake',
    description: 'Soft and fluffy vanilla sponge cake.',
    price: 15,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynJ0YZfnTBokj3ENuMe1E9HkAq2-ZIuD_Zg&s',
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
