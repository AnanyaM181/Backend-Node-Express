// Load environment variables from a .env file into process.env
// This allows us to store sensitive data like API keys, database URLs, etc. securely
require('dotenv').config();

// Import the Express framework - used to create and manage our web server
const express = require('express');

// Import our custom database connection function from the db folder
// This function will handle connecting to MongoDB
const connectDb = require('./src/db/connectDb');

// Import our URL-related routes (endpoints) from the routes folder
// This contains all the API endpoints for URL operations (save, retrieve, etc.)
const urlRoutes = require('./src/routes/urlRoutes');

// Import CORS (Cross-Origin Resource Sharing) middleware
// This allows our API to accept requests from different domains/origins
// Without this, browsers would block requests from frontend apps on different domains
const cors = require('cors');

// Create an Express application instance
// This 'app' object has methods for routing HTTP requests, configuring middleware, etc.
const app = express();

// Set the port number for our server
// First, it tries to use PORT from environment variables (.env file)
// If PORT is not defined in .env, it defaults to 5001
const PORT = process.env.PORT || 5001;

// MIDDLEWARE CONFIGURATION
// Middleware are functions that execute during the request-response cycle

// Enable CORS for all routes
// This allows frontend applications from any origin to make requests to this API
app.use(cors());

// Enable JSON parsing middleware
// This parses incoming requests with JSON payloads
// It makes req.body available with the parsed JSON data
app.use(express.json());

// DATABASE CONNECTION
// Establish connection to MongoDB database
// This function is typically async and connects using mongoose
connectDb();

// API ROUTES
// Mount the URL routes under the '/api' prefix
// All routes defined in urlRoutes will be accessible at /api/...
// For example: /api/urls, /api/urls/:id, etc.
app.use('/api', urlRoutes);

// TEST ROUTE
// Define a simple GET route at the root path '/'
// This is used to check if the server is running properly
// When someone visits http://localhost:5001/, they'll see this message
app.get('/', (req, res) => res.send('✅ URL Saver API is running'));

// START THE SERVER
// Start the Express server and listen for incoming requests on the specified PORT
// The callback function runs once the server successfully starts
// It logs a message to the console confirming the server is running
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));