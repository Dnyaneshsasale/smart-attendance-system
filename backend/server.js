const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api');
const app = express();

// Middlewares
app.use(express.json()); // To read JSON data
app.use(cors());         // To allow Frontend to talk to Backend
app.use('/api', apiRoutes);
// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected (Compass)"))
    .catch(err => console.log("❌ Connection Error:", err));

// Test Route
app.get('/', (req, res) => res.send("API is working!"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));