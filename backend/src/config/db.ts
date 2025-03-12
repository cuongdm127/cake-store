import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

const connectDB = async () => {
    if (!MONGO_URI) {
        console.error('Mongo URI not found in .env')
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ MongoDB Connection Error:`, error);
        process.exit(1);
    }
}

export default connectDB;