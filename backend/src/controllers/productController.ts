import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' })
            return
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, image } = req.body

        if (!name || !description || !price || !image) {
            res.status(400).json({ message: 'All fields are required' })
            return
        }

        const product = new Product({
            name, description, price, image
        })

        const createdProduct = await product.save();
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error })
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, image } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        await product.deleteOne();

        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
