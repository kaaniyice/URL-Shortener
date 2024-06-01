const mongoose = require('mongoose');

const urlModel = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clicks: {
    type: Number,
    default: 0
  }
});

// for fast 
urlModel.index({ clicks: -1 });

const URL = mongoose.model('URL', urlModel);

module.exports = { URL };