const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  whatsappNumber: {
    type: String,
    default: '919876543210'
  },
  emailId: {
    type: String,
    default: 'hello@umaya.reset'
  },
  instagramUsername: {
    type: String,
    default: 'umaya.reset'
  },
  phoneNumber: {
    type: String,
    default: '+91 98765 43210'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Setting', settingSchema);
