const mongoose = require('mongoose')

let url = new mongoose.Schema({
  url: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
})

module.exports = mongoose.model('Url', url)