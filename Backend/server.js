// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
// You can import more routes like: jobRoutes, authRoutes, etc.

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI not found in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" MongoDB connection error:", err);
        process.exit(1);
    });
