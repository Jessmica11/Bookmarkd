const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/our-database', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware and other setup

// Use the authRoutes
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
