import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';
import { faker } from '@faker-js/faker';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('MongoDB connected!');
};

const randomDateInLast30Days = () => {
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const seedOrders = async () => {
  try {
    await connectDB();

    await Order.deleteMany();

    const users = await User.find({ role: 'user' });
    const products = await Product.find();

    if (!users.length || !products.length) {
      throw new Error('No users or products to create orders.');
    }

    // Weighted product distribution
    const weightedProducts: any[] = [];

    products.forEach((product) => {
      const weight = faker.number.int({ min: 1, max: 10 });
      for (let i = 0; i < weight; i++) {
        weightedProducts.push(product);
      }
    });

    const orders = [];

    for (let i = 0; i < 100; i++) {
      const user = faker.helpers.arrayElement(users);

      const numItems = faker.number.int({ min: 1, max: 5 });
      const orderItems = [];

      let totalPrice = 0;

      for (let j = 0; j < numItems; j++) {
        const product = faker.helpers.arrayElement(weightedProducts);

        const quantity = faker.number.int({ min: 1, max: 3 });
        const itemTotal = product.price * quantity;

        orderItems.push({
          productId: product._id,
          name: product.name,
          quantity,
          price: product.price
        });

        totalPrice += itemTotal;
      }

      const isPaid = faker.datatype.boolean();
      const isDelivered = isPaid ? faker.datatype.boolean() : false;

      const createdAt = randomDateInLast30Days();

      orders.push({
        userId: user._id,
        orderItems,
        shippingAddress: {
          fullName: user.name,
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
          phone: faker.phone.number()
        },
        paymentMethod: 'Cash on Delivery',
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        isPaid,
        paidAt: isPaid ? createdAt : undefined,
        isDelivered,
        deliveredAt: isDelivered ? createdAt : undefined,
        createdAt,
        updatedAt: createdAt
      });
    }

    await Order.insertMany(orders);
    console.log(`${orders.length} Orders Seeded ✅`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedOrders();
