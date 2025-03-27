const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateContent = async (req, res) => {
  try {
    const inputText = req.file.buffer.toString('utf-8');

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are an educational assistant helping generate lecture materials." },
        { role: "user", content: `Generate PowerPoint slides, quizzes, and exercises based on this lecture content:\n\n${inputText}` }
      ],
      max_tokens: 1500,
    });

    res.json({ generatedContent: response.choices[0].message.content });
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
};
