import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('MongoDB connected!');
};

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const users = [];
    const hashedPassword = bcrypt.hashSync('123456', 10);
    // Admin user
    users.push({
      name: 'Admin User',
      email: 'admin@example.com',
      passwordHash: hashedPassword, // If your model hashes automatically
      role: 'admin',
    });

    // Generate random users
    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash: hashedPassword, // Use plain password if pre-save hash works
        role: 'user',
      });
    }

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} Users Seeded ✅`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
