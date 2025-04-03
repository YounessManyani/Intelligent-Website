require('dotenv').config();
const express = require('express');
const cors = require('cors');

const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);

// Server launch
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
