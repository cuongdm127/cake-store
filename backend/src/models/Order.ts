import mongoose, { Schema } from "mongoose";

export interface IOrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    userId: string;
    orderItems: IOrderItem[];
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
    };
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
    productId: { type: String, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>({
    userId: { type: String, require: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
        fullName: { type: String, require: true },
        address: { type: String, require: true },
        city: { type: String, require: true },
        postalCode: { type: String, require: true },
        country: { type: String, require: true },
        phone: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true, default: 'Cash on Delivery' },
    totalPrice: { type: Number, require: true },
    isPaid: { type: Boolean, require: true },
    paidAt: { type: Date, require: true },
    isDelivered: { type: Boolean, require: true },
    deliveredAt: { type: Date, require: true },
},
    { timestamps: true }
)

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;