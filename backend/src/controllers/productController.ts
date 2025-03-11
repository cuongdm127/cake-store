import { Request, Response } from 'express';

const products = [
    {
        id: 1,
        name: 'Chocolate Fudge Cake',
        description: 'Rich and moist chocolate cake topped with fudge frosting.',
        price: 20,
        image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb',
    },
    {
        id: 2,
        name: 'Strawberry Shortcake',
        description: 'Fluffy cake layered with fresh strawberries and whipped cream.',
        price: 18,
        image: 'https://images.unsplash.com/photo-1542925305-2eb9c9b36c38',
    },
];

export const getAllProducts = (_req: Request, res: Response) => {
    res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
};
