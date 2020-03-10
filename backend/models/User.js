const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.hashPassword = async password => {
  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hash(password, salt);

  return hash;
};

module.exports.getUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

module.exports.comparePassword = async (candidatePassword, hash) => {
  const isMatch = await bcryptjs.compare(candidatePassword, hash);
  return isMatch;
};
