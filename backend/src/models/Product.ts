import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        stock: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model<IProduct>('Product', productSchema)

export default Product;