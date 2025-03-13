export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface Order {
    _id: string;
    userId: string;
    orderItems: OrderItem[];
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
    isDelivered: boolean;
    createdAt: string;
}
