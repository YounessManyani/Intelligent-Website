const express = require('express');
const multer = require('multer');
const { generateContent } = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/generate-content', upload.single('file'), generateContent);

module.exports = router;
