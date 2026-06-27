const Setting = require('../models/Setting');

const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { whatsappNumber, emailId, instagramUsername, phoneNumber } = req.body;
    
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting();
    }

    if (whatsappNumber !== undefined) settings.whatsappNumber = whatsappNumber.trim();
    if (emailId !== undefined) settings.emailId = emailId.trim().toLowerCase();
    if (instagramUsername !== undefined) settings.instagramUsername = instagramUsername.trim().toLowerCase();
    if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber.trim();
    
    settings.updatedAt = Date.now();

    const savedSettings = await settings.save();
    res.json(savedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
