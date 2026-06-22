const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { upload, uploadImage } = require('../controllers/uploadController');

router.post('/', auth, upload.single('image'), uploadImage);

module.exports = router;
