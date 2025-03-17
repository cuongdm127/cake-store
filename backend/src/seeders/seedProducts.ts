

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product';
import { faker } from '@faker-js/faker';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('MongoDB connected!');
};

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    const products = [];

    for (let i = 0; i < 50; i++) {
      products.push({
        name: faker.commerce.productName() + ' Cake',
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
        stock: faker.number.int({ min: 0, max: 100 }),
        image: 'https://static.vecteezy.com/system/resources/thumbnails/053/190/619/small/gourmet-berry-chocolate-cake-on-elegant-table-setting-free-photo.jpg', // or unsplash static if you prefer
      });
    }

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} Products Seeded ✅`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
