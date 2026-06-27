const Category = require('../models/Category');
const Product = require('../models/Product');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const existingCategory = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name or slug already exists' });
    }

    const category = new Category({ name, slug });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const oldSlug = category.slug;

    if (name !== undefined) category.name = name;
    if (slug !== undefined && slug !== category.slug) {
      const existingSlug = await Category.findOne({ slug });
      if (existingSlug) {
        return res.status(400).json({ message: 'Category with this slug already exists' });
      }
      category.slug = slug;
    }

    const updatedCategory = await category.save();

    // Update all products in this category if the slug changed
    if (slug && slug !== oldSlug) {
      await Product.updateMany({ category: oldSlug }, { category: slug });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(req.params.id);

    // Update products belonging to this category to 'uncategorized'
    await Product.updateMany({ category: category.slug }, { category: 'uncategorized' });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
