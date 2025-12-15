const mongoose = require('mongoose'); //connects Node.js to MongoDB

const validator = require('validator');
// Validator checks whether the data given by a user is correct or not.
// Validator provides ready-made functions to validate data
// Here, we use it to check whether a string is a valid URL
// Without this, We would have to write our own URL-checking logic.

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, 'URL is required'],
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Invalid URL format (must include http:// or https://)',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
