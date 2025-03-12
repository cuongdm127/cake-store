import { Request, Response } from 'express';
import Cart from '../models/Cart';

// GET /api/cart
export const getUserCart = async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        res.json({ items: [] });
        return;
    }

    res.json(cart);
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

    await Cart.findOneAndDelete({ userId });

    res.json({ message: 'Cart cleared' });
};
