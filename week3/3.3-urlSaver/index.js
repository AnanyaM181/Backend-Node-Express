require('dotenv').config();
const express = require('express');
const connectDb = require('./src/db/connectDb');
const urlRoutes = require('./src/routes/urlRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDb();

// Routes
app.use('/api', urlRoutes);

// Test route
app.get('/', (req, res) => res.send('✅ URL Saver API is running'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
