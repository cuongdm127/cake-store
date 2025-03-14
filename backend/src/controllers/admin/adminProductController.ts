import { Request, Response } from 'express';
import Product from '../../models/Product';

// @desc    Get all products (admin)
// @route   GET /api/admin/products
export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
};

// @desc    Create a new product
// @route   POST /api/admin/products
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, stock } = req.body;

  const product = new Product({
    name,
    description,
    price,
    image,
    stock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update product by ID
// @route   PUT /api/admin/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, image, stock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.stock = stock ?? product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete product by ID
// @route   DELETE /api/admin/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
