const mongoose = require('mongoose');
const Category = require('../models/Category');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed default categories if database is empty
    const count = await Category.countDocuments();
    if (count === 0) {
      const defaults = [
        { name: 'Crystals', slug: 'crystals' },
        { name: 'Bracelets', slug: 'bracelets' },
        { name: 'Ritual Kits', slug: 'ritual-kits' },
        { name: 'Energy Tools', slug: 'energy-tools' },
        { name: 'Decor', slug: 'decor' }
      ];
      await Category.insertMany(defaults);
      console.log('Seeded default categories');
    }

    // Sync product stock status
    await syncProductStockStatus();
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};

const syncProductStockStatus = async () => {
  try {
    const Product = require('../models/Product');
    const res1 = await Product.updateMany(
      { 
        $or: [
          { stockCount: 0 },
          { stockCount: { $exists: false } }
        ],
        stock: true 
      },
      { $set: { stock: false, stockCount: 0 } }
    );
    if (res1.modifiedCount > 0) {
      console.log(`Synced: marked ${res1.modifiedCount} products with 0 stock as Out of Stock`);
    }

    const res2 = await Product.updateMany(
      { stockCount: { $gt: 0 }, stock: false },
      { $set: { stock: true } }
    );
    if (res2.modifiedCount > 0) {
      console.log(`Synced: marked ${res2.modifiedCount} products with positive stock as In Stock`);
    }
  } catch (err) {
    console.error('Failed to sync product stock status:', err);
  }
};

module.exports = connectDB;