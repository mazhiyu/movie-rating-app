const mongoose = require('mongoose');

const { Schema } = mongoose;
const MovieSchema = new Schema({
  name: String,
  description: String,
  released: String,
  genre: String,
  runtime: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
