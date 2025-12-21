const mongoose = require('mongoose'); //connects Node.js to MongoDB

const validator = require('validator');
// Validator checks whether the data given by a user is correct or not.
// Validator provides ready-made functions to validate data
// Here, we use it to check whether a string is a valid URL
// Without this, We would have to write our own URL-checking logic.

const urlSchema = new mongoose.Schema({
  /**
A schema defines the structure of a document in MongoDB
A blueprint / form that tells MongoDB what fields are allowed and what rules they follow
  **/
  url: { // This field will store the actual website link
    type: String, // Tells MongoDB that url must be a string
    required: [true, 'URL is required'], // If user doesn’t provide a URL, MongoDB throws an error
    validate: { // Adds custom validation to the url field, Runs before saving data to database
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      /*
      v represents the value entered for url
      validator.isURL() checks if v is a valid URL
      Options used:
      protocols: ['http', 'https']
      → Only allow http or https URLs
      require_protocol: true
      → URL must include http:// or https://
      */
      message: 'Invalid URL format (must include http:// or https://)',
      // Custom error message shown if URL validation fails
    },
  },
  description: { // description is Used to store explanation about the URL
    type: String, // Description must be a string
    required: [true, 'Description is required'], // description mandatory
  },
  createdAt: { // Declares a field to store time when URL was saved
    type: Date, // Field will store a date value
    default: Date.now, // Automatically sets current date & time when data is saved
  },
});

const Url = mongoose.model('Urls', urlSchema);
// Creates a model named Url
// Links schema with MongoDB collection

module.exports = Url;
//Makes this model available to other files
//Allows routes to use it for database operations
