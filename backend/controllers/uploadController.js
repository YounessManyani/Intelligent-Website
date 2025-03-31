// Import the OpenAI library
const { OpenAI } = require('openai');

// Create a new OpenAI instance using your secret API key from environment variables
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// Export the generateContent function to be used in uploadRoutes.js
exports.generateContent = async (req, res) => {
  try {
    // 1️⃣ Convert the uploaded file from a binary buffer to a plain text string
    // req.file.buffer is provided by Multer (in-memory file)
    const inputText = req.file.buffer.toString('utf-8');
    // 2️⃣ Send the lecture content to OpenAI's chat completion endpoint (GPT-4 Turbo)
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",  // The model used to generate content
      messages: [
        // System prompt tells the AI how it should behave
        { role: "system", content: "You are an educational assistant helping generate lecture materials." },
        // User prompt contains the uploaded lecture content
        { role: "user", content: `Generate PowerPoint slides, quizzes, and exercises based on this lecture content:\n\n${inputText}` }
      ],
      max_tokens: 1500,  // Maximum length of the AI's response
    });

    // 3️⃣ Return the generated content back to the frontend
    res.json({ generatedContent: response.choices[0].message.content });
  } catch (error) {
    // 4️⃣ Catch and return any errors (e.g., OpenAI failure, file missing, etc.)
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
};
