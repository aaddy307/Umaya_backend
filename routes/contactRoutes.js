const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createContactMessage,
  getAllContactMessages
} = require('../controllers/contactController');

router.post('/', createContactMessage);
router.get('/', auth, getAllContactMessages);

module.exports = router;