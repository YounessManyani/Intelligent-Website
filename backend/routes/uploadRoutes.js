// Import Express.js to create routes
const express = require('express');

// Import Multer to handle file uploads
const multer = require('multer');

// Import the controller function that will process the uploaded file and generate content
const { generateContent } = require('../controllers/uploadController');


// Configure Multer to store uploaded files in memory (RAM)
// This is useful for quick processing without saving to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Create a new Express router instance to define endpoints
const router = express.Router();


// Define a POST route at /generate-content
// - upload.single('file') tells Multer to expect a single file with the field name 'file'
// - generateContent is the controller that processes the file and sends it to OpenAI
router.post('/generate-content', upload.single('file'), generateContent);


// Export the router so it can be used in server.js
// Example: app.use('/upload', uploadRoutes);
module.exports = router;
