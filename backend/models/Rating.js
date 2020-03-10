const mongoose = require('mongoose');

const { Schema } = mongoose;
const RatingSchema = new Schema({
  movieID: String,
  userID: String,
  rate: Number,
});

module.exports = mongoose.model('Rating', RatingSchema);
