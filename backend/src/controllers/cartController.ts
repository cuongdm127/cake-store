import { Request, Response } from 'express';
import Cart from '../models/Cart';

// GET /api/cart
export const getUserCart = async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price imageUrl');

    if (!cart) {
        res.json({ items: [] });
        return;
    }

    interface PopulatedProduct {
        _id: string;
        name: string;
        price: number;
        imageUrl: string;
    }

    // Map to combine quantity with product info
    const cartItems = cart.items
        .filter((item) => item.productId)
        .map((item) => {
            const product = item.productId as unknown as PopulatedProduct;

            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: item.quantity,
            };
        });

    res.json({ items: cartItems });
};

// POST /api/cart
export const saveUserCart = async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { items } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items });
    } else {
        cart.items = items;
    }

    await cart.save();
    res.json(cart);
};

// DELETE /api/cart
export const clearUserCart = async (req: Request, res: Response) => {
    const userId = req.user!._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
        return;
    }

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared' });
};
