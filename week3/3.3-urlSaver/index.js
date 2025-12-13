require('dotenv').config();
const express = require('express');
const connectDb = require('./src/db/connectDb');
const urlRoutes = require('./src/routes/urlRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api/urls', urlRoutes);

// Test route
app.get('/', (req, res) => res.send('✅ URL Saver API is running'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
