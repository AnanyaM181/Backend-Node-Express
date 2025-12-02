const mongoose = require('mongoose');
const validator = require('validator');

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
