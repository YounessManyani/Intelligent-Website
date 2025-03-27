const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title: String,
    content: String,
    generatedContent: Object, // Stores AI-generated materials
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lecture", LectureSchema);
