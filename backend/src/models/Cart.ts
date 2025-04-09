import mongoose, { Schema } from "mongoose";

export interface ICartItem {
    productId: string;
    quantity: number;
}

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>({
    productId: { type: String, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
})

const cartSchema = new Schema<ICart>({
    userId: { type: String, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
})

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;