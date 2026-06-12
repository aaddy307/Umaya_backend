const ContactMessage = require('../models/ContactMessage');

const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = new ContactMessage({
      name,
      email,
      message
    });

    const savedMessage = await contactMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages
};