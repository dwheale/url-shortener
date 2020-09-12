const mongoose = require('mongoose')

let urlSchema = new mongoose.Schema({
  url: String,
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
})

module.exports = mongoose.model('Url', urlSchema)