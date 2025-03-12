import mongoose, { Document, Types } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    role: 'user' | 'admin';
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    {
        timestamps: true
    }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.passwordHash)
}

const User = mongoose.model<IUser>('User', userSchema)

export default User;