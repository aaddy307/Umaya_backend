const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, slug, category, price, description, benefits, images, stock, featured } = req.body;

    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this slug already exists' });
    }

    const product = new Product({
      name,
      slug,
      category,
      price,
      description,
      benefits,
      images,
      stock,
      featured
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, slug, category, price, description, benefits, images, stock, featured } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (slug && slug !== product.slug) {
      const existingProduct = await Product.findOne({ slug });
      if (existingProduct) {
        return res.status(400).json({ message: 'Product with this slug already exists' });
      }
    }

    product.name = name || product.name;
    product.slug = slug || product.slug;
    product.category = category || product.category;
    product.price = price || product.price;
    product.description = description || product.description;
    product.benefits = benefits || product.benefits;
    product.images = images || product.images;
    product.stock = stock !== undefined ? stock : product.stock;
    product.featured = featured !== undefined ? featured : product.featured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};